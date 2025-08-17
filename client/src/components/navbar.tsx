import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Film className="h-8 w-8 text-punjabi-orange mr-2" />
            <h1 className="text-2xl font-poppins font-bold text-punjabi-orange">
              Jashan Films
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-punjabi-orange"
                      : "text-punjabi-dark hover:text-punjabi-orange"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {user && isAdmin && (
              <Link href="/admin">
                <Button className="bg-punjabi-orange text-white hover:bg-punjabi-red">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-punjabi-dark hover:text-punjabi-orange"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      isActive(item.href)
                        ? "text-punjabi-orange"
                        : "text-punjabi-dark hover:text-punjabi-orange"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              {user && isAdmin && (
                <Link href="/admin">
                  <Button 
                    className="w-full bg-punjabi-orange text-white hover:bg-punjabi-red"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
