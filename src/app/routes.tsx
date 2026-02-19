import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MenuBuilder from "./pages/MenuBuilder";
import MenuView from "./pages/MenuView";
import MyMenus from "./pages/MyMenus";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedMenuBuilder() {
  return (
    <ProtectedRoute>
      <MenuBuilder />
    </ProtectedRoute>
  );
}

function ProtectedMyMenus() {
  return (
    <ProtectedRoute>
      <MyMenus />
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "about", Component: About },
      { path: "contribute", Component: Contribute },
      { path: "dashboard", Component: ProtectedDashboard },
      { path: "menu-builder", Component: ProtectedMenuBuilder },
      { path: "my-menus", Component: ProtectedMyMenus },
      { path: "menu/:slug", Component: MenuView },
      { path: "*", Component: NotFound },
    ],
  },
]);
