import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/currentGames",
    name: "currentGames",
    component: () => import("./pages/CurrentGamesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manageLeague",
    name: "manageLeague",
    component: () => import("./pages/ManageLeaguePage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
