import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, UserMinus, Shield } from "lucide-react";
import { collection, getDocs, doc, deleteDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Admin {
  id: string;
  email: string;
  isAdmin: boolean;
  addedAt?: any;
}

export function AdminManager() {
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminUid, setNewAdminUid] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all admins
  const { data: admins, isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: async (): Promise<Admin[]> => {
      const adminsSnapshot = await getDocs(collection(db, 'admins'));
      return adminsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Admin, 'id'>
      }));
    }
  });

  // Add admin mutation
  const addAdminMutation = useMutation({
    mutationFn: async ({ uid, email }: { uid: string; email: string }) => {
      const adminRef = doc(db, 'admins', uid);
      await setDoc(adminRef, {
        email,
        isAdmin: true,
        addedAt: Timestamp.now()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      setNewAdminEmail('');
      setNewAdminUid('');
      toast({
        title: "Admin Added",
        description: "User has been granted admin access successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add admin: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Remove admin mutation
  const removeAdminMutation = useMutation({
    mutationFn: async (adminId: string) => {
      await deleteDoc(doc(db, 'admins', adminId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({
        title: "Admin Removed",
        description: "Admin access has been revoked successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to remove admin: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleAddAdmin = () => {
    if (!newAdminUid.trim() || !newAdminEmail.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both UID and email address.",
        variant: "destructive",
      });
      return;
    }

    addAdminMutation.mutate({
      uid: newAdminUid.trim(),
      email: newAdminEmail.trim()
    });
  };

  const handleRemoveAdmin = (adminId: string) => {
    if (confirm('Are you sure you want to remove this admin? This action cannot be undone.')) {
      removeAdminMutation.mutate(adminId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">User UID</label>
              <Input
                placeholder="User's Firebase UID"
                value={newAdminUid}
                onChange={(e) => setNewAdminUid(e.target.value)}
                data-testid="input-admin-uid"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Found in Firebase Authentication → Users tab
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                data-testid="input-admin-email"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddAdmin}
            disabled={addAdminMutation.isPending}
            data-testid="button-add-admin"
          >
            {addAdminMutation.isPending ? "Adding..." : "Add Admin"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Admins ({admins?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading admins...</div>
          ) : admins?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No admins found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {admins?.map((admin) => (
                <div 
                  key={admin.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                  data-testid={`admin-card-${admin.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-orange-600" />
                    <div>
                      <div className="font-medium">{admin.email}</div>
                      <div className="text-xs text-muted-foreground">
                        UID: {admin.id}
                      </div>
                      {admin.addedAt && (
                        <div className="text-xs text-muted-foreground">
                          Added: {new Date(admin.addedAt.seconds * 1000).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Admin</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdmin(admin.id)}
                      disabled={removeAdminMutation.isPending}
                      data-testid={`button-remove-admin-${admin.id}`}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800">How to Find User UID</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 text-sm space-y-2">
          <p><strong>Step 1:</strong> Ask the user to sign in to the admin page once</p>
          <p><strong>Step 2:</strong> Go to Firebase Console → Authentication → Users</p>
          <p><strong>Step 3:</strong> Find their email and copy the UID</p>
          <p><strong>Step 4:</strong> Paste the UID above to grant admin access</p>
        </CardContent>
      </Card>
    </div>
  );
}