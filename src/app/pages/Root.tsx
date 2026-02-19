import { Outlet } from "react-router";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from "../components/ThemeProvider";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="menucraft-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
