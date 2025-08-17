import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Music, Mail, Edit, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import SongsManager from "./songs-manager";
import SubmissionsManager from "./submissions-manager";
import { AdminManager } from "./admin-manager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("songs");
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-punjabi-dark">Firebase Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.displayName || user?.email}!</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-punjabi-dark border-punjabi-dark hover:bg-punjabi-orange hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Music className="h-8 w-8 text-punjabi-orange" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Songs</p>
                  <p className="text-2xl font-bold text-punjabi-dark">--</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-punjabi-orange" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Messages</p>
                  <p className="text-2xl font-bold text-punjabi-dark">--</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-punjabi-orange" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Artists Featured</p>
                  <p className="text-2xl font-bold text-punjabi-dark">300+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-punjabi-orange" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Shows Produced</p>
                  <p className="text-2xl font-bold text-punjabi-dark">150+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-punjabi-dark">Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="songs">Songs Management</TabsTrigger>
                <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
                <TabsTrigger value="admins">Admin Management</TabsTrigger>
              </TabsList>
              
              <TabsContent value="songs" className="mt-6">
                <SongsManager />
              </TabsContent>
              
              <TabsContent value="submissions" className="mt-6">
                <SubmissionsManager />
              </TabsContent>
              
              <TabsContent value="admins" className="mt-6">
                <AdminManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
