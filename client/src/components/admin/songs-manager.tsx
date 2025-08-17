import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getAllSongs, addSong, updateSong, deleteSong, type Song } from "@/lib/firestore";
import { Plus, Edit, Trash2, Youtube, ExternalLink } from "lucide-react";

const songSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  youtubeUrl: z.string().url("Invalid YouTube URL"),
});

type SongFormData = z.infer<typeof songSchema>;

export default function SongsManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: getAllSongs,
  });

  const form = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      youtubeUrl: "",
    },
  });

  const addSongMutation = useMutation({
    mutationFn: async (data: SongFormData) => {
      return await addSong(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Song added successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add song",
        variant: "destructive",
      });
    },
  });

  const updateSongMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: SongFormData }) => {
      return await updateSong(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setEditingSong(null);
      form.reset();
      toast({
        title: "Success",
        description: "Song updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update song",
        variant: "destructive",
      });
    },
  });

  const deleteSongMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteSong(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast({
        title: "Success",
        description: "Song deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete song",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SongFormData) => {
    if (editingSong) {
      updateSongMutation.mutate({ id: editingSong.id, data });
    } else {
      addSongMutation.mutate(data);
    }
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    form.reset({
      title: song.title,
      artist: song.artist,
      youtubeUrl: song.youtubeUrl,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteSongMutation.mutate(id);
    }
  };

  const resetForm = () => {
    form.reset();
    setEditingSong(null);
    setIsAddDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-punjabi-dark">Songs Gallery Management</h3>
        <Dialog open={isAddDialogOpen || !!editingSong} onOpenChange={(open) => {
          if (!open) resetForm();
          else setIsAddDialogOpen(true);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-punjabi-orange text-white hover:bg-punjabi-red">
              <Plus className="mr-2 h-4 w-4" />
              Add Song
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingSong ? "Edit Song" : "Add New Song"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter song title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter artist name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-punjabi-orange text-white hover:bg-punjabi-red"
                    disabled={addSongMutation.isPending || updateSongMutation.isPending}
                  >
                    {(addSongMutation.isPending || updateSongMutation.isPending) 
                      ? "Saving..." 
                      : editingSong ? "Update Song" : "Add Song"
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-punjabi-dark">Current Songs ({songs?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!songs || songs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No songs added yet. Add your first song to get started!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <a 
                          href={song.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <Youtube className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(song)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(song.id)}
                          disabled={deleteSongMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
