import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Github, Send, Mail, Heart } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('footer.brand')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t('footer.product')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contribute" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.contribute')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.dashboard')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/my-menus" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.myMenus')}
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t('footer.connect')}</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@menucraft.com" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.supportText')}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('footer.rights')}
            </p>
            {/* <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for restaurants
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
