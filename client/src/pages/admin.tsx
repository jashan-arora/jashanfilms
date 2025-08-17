import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, Music, Mail, Edit, BarChart } from "lucide-react";
import AdminDashboard from "@/components/admin/dashboard";

export default function Admin() {
  const { user, loading, signInWithGoogle, isAdmin } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-punjabi-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (user && isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <section className="py-20 bg-punjabi-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-white mb-4">Admin Portal</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serverless content management with Firebase authentication
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-punjabi-orange to-punjabi-red p-6">
              <h3 className="text-2xl font-poppins font-bold text-white">Firebase Admin Dashboard</h3>
              <p className="text-white/90">Secure Google OAuth authentication</p>
            </div>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-poppins font-semibold text-punjabi-dark mb-6">Sign In with Google</h4>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={handleGoogleSignIn}
                      className="w-full bg-punjabi-orange text-white hover:bg-punjabi-red font-semibold text-lg py-3"
                      size="lg"
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Continue with Google
                    </Button>
                    
                    <div className="text-center text-sm text-gray-600">
                      Secure authentication powered by Firebase
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Admin Access:</strong><br />
                      • Sign in with Google<br />
                      • Admin permissions based on email address<br />
                      • Contact developer to add your email to admin list
                    </p>
                  </div>
                  
                  {user && !isAdmin && (
                    <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800">
                        <strong>Signed in as:</strong> {user.email}<br />
                        This email doesn't have admin permissions.<br />
                        Contact the developer to request admin access.
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-xl font-poppins font-semibold text-punjabi-dark mb-6">Admin Features</h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-punjabi-cream rounded-lg">
                      <Music className="h-6 w-6 text-punjabi-orange mr-3" />
                      <div>
                        <p className="font-medium text-punjabi-dark">Songs Management</p>
                        <p className="text-sm text-gray-600">Add, edit, delete YouTube video links</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-punjabi-cream rounded-lg">
                      <Mail className="h-6 w-6 text-punjabi-orange mr-3" />
                      <div>
                        <p className="font-medium text-punjabi-dark">Form Submissions</p>
                        <p className="text-sm text-gray-600">View and manage contact requests</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-punjabi-cream rounded-lg">
                      <Edit className="h-6 w-6 text-punjabi-orange mr-3" />
                      <div>
                        <p className="font-medium text-punjabi-dark">Content Editor</p>
                        <p className="text-sm text-gray-600">Update website content and information</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-punjabi-cream rounded-lg">
                      <BarChart className="h-6 w-6 text-punjabi-orange mr-3" />
                      <div>
                        <p className="font-medium text-punjabi-dark">Real-time Database</p>
                        <p className="text-sm text-gray-600">Firebase Firestore integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
