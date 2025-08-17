import { Button } from "@/components/ui/button";
import { Mic, Youtube } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-bg"></div>
      {/* Professional TV studio background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
          Bringing Punjabi Music to{" "}
          <span className="text-punjabi-gold">Doordarshan</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto">
          Professional TV Programme Production • Licensed Advertisement Agency • Punjabi Cultural Showcase
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/contact">
            <Button size="lg" className="bg-white text-punjabi-orange hover:bg-punjabi-cream text-lg px-8 py-4 font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Mic className="mr-2 h-5 w-5" />
              Submit Your Song
            </Button>
          </a>
          <a 
            href="https://www.youtube.com/@JashanProduction" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-punjabi-red text-white hover:bg-punjabi-red/90 text-lg px-8 py-4 font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Youtube className="mr-2 h-5 w-5" />
              YouTube Channel
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
