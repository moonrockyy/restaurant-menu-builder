import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Removed the extra "-dom"
import Root from "./pages/Root";
import MenuView from "./pages/MenuView";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy load components
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyMenus = lazy(() => import("./pages/MyMenus"));
const MenuBuilder = lazy(() => import("./pages/MenuBuilder"));
const TemplateSelector = lazy(() => import("./pages/TemplateSelector"));
const About = lazy(() => import("./pages/About"));
const Contribute = lazy(() => import("./pages/Contribute"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "contribute", element: <Contribute /> },
      { path: "dashboard", element: <ProtectedDashboard /> },
      { path: "template-selector", element: <TemplateSelector /> },
      { path: "my-menus", element: <ProtectedMyMenus /> },
      { path: "menu-builder", element: <ProtectedMenuBuilder /> },
      { path: "menu/:slug", element: <MenuView /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
