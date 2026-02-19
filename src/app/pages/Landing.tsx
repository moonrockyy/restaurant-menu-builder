import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Menu, Coffee, Utensils, ChefHat } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Menu className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-foreground">MenuCraft</h1>
          </div>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-orange-600 hover:bg-orange-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Create Beautiful Menus for Your Business
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Professional menu templates for restaurants, cafes, bars, and more. 
              No design skills needed. Get started in minutes.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Start Creating Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1769773297747-bd00e31b33aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZWxlZ2FudCUyMGRpbmluZ3xlbnwxfHx8fDE3NzE0NDg5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Restaurant"
              className="rounded-xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Create Perfect Menus
          </h3>
          <p className="text-lg text-muted-foreground">
            Choose from professionally designed templates and customize them to match your brand
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Restaurant Templates</h4>
              <p className="text-muted-foreground">
                Elegant and sophisticated templates perfect for fine dining and casual restaurants
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Cafe Templates</h4>
              <p className="text-muted-foreground">
                Modern and cozy designs ideal for cafes, coffee shops, and bakeries
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Custom Branding</h4>
              <p className="text-muted-foreground">
                Customize colors, fonts, and layouts to perfectly match your brand identity
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-orange-50">
            Join thousands of restaurants and cafes creating beautiful menus
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-50">
              Create Your Menu Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Buy Me a Coffee Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-12 text-center border-2 border-orange-100 dark:border-orange-900/30">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-3">Enjoying MenuCraft?</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
            If you find this tool helpful, consider buying me a coffee to support continued development
          </p>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Coffee className="w-5 h-5 mr-2" />
              Buy Me a Coffee
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 MenuCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
