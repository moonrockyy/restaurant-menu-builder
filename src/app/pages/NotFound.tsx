import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft, Menu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Menu className="w-24 h-24 text-orange-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-orange-600">404</span>
              </div>
            </div>
          </div>
          
          {/* Animated elements */}
          <div className="absolute top-0 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-pulse" />
          <div className="absolute top-4 right-1/4 w-3 h-3 bg-orange-300 rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-2 left-1/3 w-2 h-2 bg-orange-200 rounded-full animate-pulse delay-150" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The menu page you're looking for seems to have vanished. 
          Don't worry, even the best restaurants sometimes misplace their menus!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to="/">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <p className="text-sm text-muted-foreground mt-8">
          If you believe this is an error, please 
          <Link to="/contribute" className="text-orange-600 hover:text-orange-700 ml-1">
            contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
