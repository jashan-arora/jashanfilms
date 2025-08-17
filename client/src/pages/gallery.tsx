import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Youtube, ExternalLink } from "lucide-react";
import { getAllSongs, type Song } from "@/lib/firestore";

export default function Gallery() {
  const { data: songs, isLoading } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: getAllSongs,
  });

  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-punjabi-dark mb-4">Songs Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Featured Punjabi music videos from our YouTube channel and TV shows
            </p>
          </div>
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No songs available</h3>
            <p className="text-gray-500 mb-8">Check back later for new music videos and performances.</p>
            <a 
              href="https://www.youtube.com/@JashanProduction" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-punjabi-red text-white hover:bg-punjabi-red/90">
                <Youtube className="mr-2 h-5 w-5" />
                Visit Our YouTube Channel
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-punjabi-dark mb-4">Songs Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Featured Punjabi music videos from our YouTube channel and TV shows
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song) => {
            const thumbnail = getYouTubeThumbnail(song.youtubeUrl);
            
            return (
              <Card key={song.id} className="bg-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-video relative">
                  {thumbnail ? (
                    <img 
                      src={thumbnail} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-punjabi-orange to-punjabi-red flex items-center justify-center">
                      <Play className="text-white text-4xl group-hover:scale-110 transition-transform" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white text-4xl" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-poppins font-semibold text-punjabi-dark mb-2 line-clamp-2">
                    {song.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {song.artist}
                  </p>
                  <div className="flex justify-end">
                    <a 
                      href={song.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-punjabi-orange hover:text-punjabi-red"
                      >
                        <Youtube className="mr-1 h-4 w-4" />
                        Watch
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://www.youtube.com/@JashanProduction" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-punjabi-red text-white hover:bg-punjabi-red/90 font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Youtube className="mr-3 h-5 w-5" />
              Visit Our YouTube Channel
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
