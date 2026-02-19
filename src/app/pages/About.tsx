import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Coffee, 
  Utensils, 
  ChefHat, 
  Star, 
  Zap, 
  Palette, 
  Smartphone,
  Users,
  Award,
  Globe,
  Heart
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About MenuCraft
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're on a mission to help restaurants, cafes, and food businesses create 
            stunning, professional menus that captivate customers and drive sales.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Start Creating Free
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              From a simple idea to a comprehensive menu design platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-foreground mb-6 leading-relaxed">
                MenuCraft was born from a simple observation: many restaurants struggle with 
                creating professional, attractive menus that reflect their brand identity. 
                Traditional design tools are expensive and complicated, while basic templates 
                lack the flexibility and creativity that modern restaurants need.
              </p>
              <p className="text-foreground mb-6 leading-relaxed">
                Our team of designers, developers, and food industry experts came together 
                to create a solution that combines the power of professional design tools 
                with the simplicity of modern web applications. The result? MenuCraft - 
                your complete menu design solution.
              </p>
              <p className="text-foreground leading-relaxed">
                Today, we're proud to help thousands of restaurants worldwide create 
                beautiful menus that not only look great but also help increase customer 
                engagement and boost sales.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/20 dark:to-orange-950/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">5,000+</div>
                    <div className="text-sm text-muted-foreground">Restaurants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                    <div className="text-sm text-muted-foreground">Templates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                    <div className="text-sm text-muted-foreground">Menus Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose MenuCraft?</h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to make menu creation effortless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">
                Choose from 25+ professionally designed templates crafted for different cuisines 
                and restaurant styles, from fine dining to casual cafes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Create stunning menus in minutes, not hours. Our intuitive interface makes 
                it easy to design, customize, and publish your menu instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Your menus look perfect on any device. Share them via QR codes, 
                social media, or embed them on your website.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Customer First</h3>
            <p className="text-sm text-muted-foreground">
              Your success is our success. We listen to feedback and continuously improve 
              based on your needs.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Quality Driven</h3>
            <p className="text-sm text-muted-foreground">
              We maintain the highest standards in design, functionality, and customer support.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Passion for Food</h3>
            <p className="text-sm text-muted-foreground">
              We love food and understand the restaurant industry. Our tools are built 
              by food lovers, for food lovers.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Global Impact</h3>
            <p className="text-sm text-muted-foreground">
              We're helping restaurants worldwide succeed in the digital age with 
              beautiful, effective menu designs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Menu?</h2>
          <p className="text-xl mb-8 text-orange-50">
            Join thousands of restaurants that trust MenuCraft for their menu design needs
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-50">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
