import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { t, i18n } = useTranslation();
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
          <h1 className="text-2xl font-bold text-foreground transition-colors duration-300 hover:text-orange-600">{t('footer.brand')}</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.about')}
            </Link>
            <Link to="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.contribute')}
            </Link>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Settings Group */}
            <div className="flex items-center gap-2 border-r pr-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            
            {/* Auth Group */}
            <div className="flex items-center gap-3">
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
                    <div className={`absolute top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 ${
                      i18n.dir() === 'rtl' ? 'left-0' : 'right-0'
                    }`}>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={closeUserDropdown}
                      >
                        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                          📊
                        </div>
                        <div>
                          <div className="font-medium">{t('header.dashboard')}</div>
                          <div className="text-sm text-muted-foreground">{t('header.dashboardDescription')}</div>
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
                          <div className="font-medium">{t('header.myMenus')}</div>
                          <div className="text-sm text-muted-foreground">{t('header.myMenusDescription')}</div>
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
                        <span>{t('header.logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">{t('header.login')}</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-300">{t('header.getStarted')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Settings for Mobile */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          
          {user ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </span>
            </div>
          ) : (
            <Link to="/signup">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-300">{t('header.getStarted')}</Button>
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
            <nav className="flex flex-col gap-2 items-center">
              <Link 
                to="/about" 
                className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                onClick={closeMobileMenu}
              >
                {t('header.about')}
              </Link>
              <Link 
                to="/contribute" 
                className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                onClick={closeMobileMenu}
              >
                {t('header.contribute')}
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={closeMobileMenu}
                  >
                    {t('header.dashboard')}
                  </Link>
                  <Link 
                    to="/my-menus" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                    onClick={closeMobileMenu}
                  >
                    {t('header.myMenus')}
                  </Link>
                </>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex justify-center">
                {user ? (
                  <button 
                    onClick={handleLogout}
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center gap-2 justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('header.logout')}
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-gray-900 dark:text-white hover:text-orange-600 transition-colors text-lg py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    {t('header.login')}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
