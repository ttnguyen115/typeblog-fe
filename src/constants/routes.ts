export interface IRoutes {
  label: string;
  path: string;
}

const settings: Array<IRoutes> = [
  { label: "Profile", path: "/profile" },
  { label: "Logout", path: "/" },
];

const bfLoginLinks: Array<IRoutes> = [
  { label: "Login", path: "/login" },
  { label: "Signup", path: "/signup" },
];

const afLoginLinks: Array<IRoutes> = [
  { label: "Home", path: "/" },
  { label: "Create blog", path: "/create_blog" },
];

export { settings, afLoginLinks, bfLoginLinks };
