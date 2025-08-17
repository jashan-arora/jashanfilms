import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getAllContactSubmissions, updateContactSubmissionStatus, deleteContactSubmission, type ContactSubmission } from "@/lib/firestore";
import { Mail, Phone, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export default function SubmissionsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions"],
    queryFn: getAllContactSubmissions,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return await updateContactSubmissionStatus(id, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast({
        title: "Success",
        description: "Message marked as read!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark as read",
        variant: "destructive",
      });
    },
  });

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case "song-submission":
        return "bg-blue-100 text-blue-800";
      case "advertisement":
        return "bg-green-100 text-green-800";
      case "collaboration":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatServiceType = (serviceType: string) => {
    switch (serviceType) {
      case "song-submission":
        return "Song Submission";
      case "advertisement":
        return "Advertisement";
      case "collaboration":
        return "Collaboration";
      default:
        return "Other";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unreadCount = submissions?.filter(s => !s.isRead).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-punjabi-dark">Contact Submissions</h3>
        <Badge variant="secondary" className="bg-punjabi-orange/10 text-punjabi-orange">
          {unreadCount} unread messages
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-punjabi-dark">All Messages ({submissions?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!submissions || submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No contact submissions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id} className={submission.isRead ? "" : "bg-blue-50"}>
                    <TableCell>
                      {submission.isRead ? (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Read
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          <Clock className="h-3 w-3 mr-1" />
                          Unread
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {submission.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getServiceTypeColor(submission.serviceType)}>
                        {formatServiceType(submission.serviceType)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {submission.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {submission.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.createdAt ? format(new Date(submission.createdAt), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {!submission.isRead && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkAsRead(submission.id)}
                          disabled={markAsReadMutation.isPending}
                          className="text-punjabi-orange border-punjabi-orange hover:bg-punjabi-orange hover:text-white"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
