import AppRouter from './routes';
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { I18nProvider } from "./contexts/I18nContext";
import '../i18n/config';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
