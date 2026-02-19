import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeUserDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    closeMobileMenu();
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
          <img src="/logo.svg" alt="MenuCraft" className="w-8 h-8 transition-transform duration-300 hover:scale-105" />
          <h1 className="text-2xl font-bold text-foreground transition-colors duration-300 hover:text-orange-600">MenuCraft</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
              Contribute
            </Link>
          </nav>
          
          <div className="flex gap-3 items-center relative">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100"
                  onClick={toggleUserDropdown}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={closeUserDropdown}
                    >
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                        📊
                      </div>
                      <div>
                        <div className="font-medium">Dashboard</div>
                        <div className="text-sm text-muted-foreground">Overview and stats</div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/my-menus" 
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={closeUserDropdown}
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                        📋
                      </div>
                      <div>
                        <div className="font-medium">My Menus</div>
                        <div className="text-sm text-muted-foreground">Manage your menus</div>
                      </div>
                    </Link>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    
                    <button 
                      onClick={() => {
                        handleLogout();
                        closeUserDropdown();
                      }} 
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-orange-600 hover:bg-orange-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </span>
            </div>
          ) : (
            <Link to="/signup">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-300">Get Started</Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/about" 
                className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/contribute" 
                className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                onClick={closeMobileMenu}
              >
                Contribute
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/my-menus" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={closeMobileMenu}
                  >
                    My Menus
                  </Link>
                </>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                {user ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <Link to="/" onClick={closeMobileMenu}>
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
