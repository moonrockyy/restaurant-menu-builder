import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MenuBuilder from "./pages/MenuBuilder";
import MenuView from "./pages/MenuView";
import MyMenus from "./pages/MyMenus";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "dashboard", Component: Dashboard },
      { path: "menu-builder", Component: MenuBuilder },
      { path: "my-menus", Component: MyMenus },
      { path: "menu/:slug", Component: MenuView },
      { path: "*", Component: NotFound },
    ],
  },
]);
