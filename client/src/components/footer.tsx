import { Film, Youtube, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-punjabi-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 text-punjabi-orange mr-2" />
              <h3 className="text-2xl font-poppins font-bold text-punjabi-orange">
                Jashan Films
              </h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading Punjabi music production company bringing authentic cultural content to Doordarshan and digital platforms.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/@JashanProduction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-punjabi-orange rounded-full flex items-center justify-center hover:bg-punjabi-red transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-punjabi-orange rounded-full flex items-center justify-center hover:bg-punjabi-red transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-punjabi-orange rounded-full flex items-center justify-center hover:bg-punjabi-red transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-punjabi-orange transition-colors">About Us</a></li>
              <li><a href="/gallery" className="hover:text-punjabi-orange transition-colors">Gallery</a></li>
              <li><a href="/contact" className="hover:text-punjabi-orange transition-colors">Contact</a></li>
              <li><a href="/admin" className="hover:text-punjabi-orange transition-colors">Admin</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-punjabi-orange mr-2 flex-shrink-0" />
                +91 98151 05700
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-punjabi-orange mr-2 flex-shrink-0" />
                official@jashanfilms.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 text-punjabi-orange mr-2 flex-shrink-0" />
                Jalandhar, Punjab, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Jashan Films. All rights reserved. Licensed Doordarshan Production House.</p>
        </div>
      </div>
    </footer>
  );
}
