import { Outlet } from "react-router";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from "../components/ThemeProvider";

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="menucraft-ui-theme">
      <Outlet />
      <Toaster />
    </ThemeProvider>
  );
}
