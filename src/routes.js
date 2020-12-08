import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Merchants from "views/examples/Merchants.js";
import Insurance from "views/examples/Insurance.js";
import Verticals from "views/examples/Verticals.js";
import Icons from "views/examples/Icons.js";
import Socials from "views/examples/Socials";
import Hashtag from "views/examples/Hashtag";
import Categories from "views/examples/Categories";
import Sponsor from "views/examples/Sponsor";
import Challenges from "views/examples/Challenges";
import Entries from "views/examples/Entries";
import EntryComments from "views/examples/EntryComments";
import UserStories from "views/examples/UserStories";
import EntryData from "views/examples/EntryData";

var routes = [
  {
    path: "/login",
    // name: "Login",
    // icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/index  ",
    // path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: "ni ni-circle-08 text-pink",

  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/merchants",
  //   name: "Merchants",
  //   icon: "ni ni-circle-08 text-pink",

  //   component: Merchants,
  //   layout: "/admin",
  // },
  // {
  //   path: "/insurance",
  //   name: "Insurance",
  //   icon: "ni ni-circle-08 text-pink",

  //   component: Insurance,
  //   layout: "/admin",
  // },
  // {
  //   path: "/verticals",
  //   name: "Verticals",
  //   icon: "ni ni-circle-08 text-pink",

  //   component: Verticals,
  //   layout: "/admin",
  // },
  {
    path: "/socials",
    name: "Socials",
    icon: "ni ni-circle-08 text-pink",
    component: Socials,
    layout: "/admin",
  },
  {
    path: "/hashtag",
    component: Hashtag,
    layout: "/admin",
  },
  {
    path: "/categories",
    component: Categories,
    layout: "/admin",
  },
  {
    path: '/sponsor',
    component: Sponsor,
    layout: '/admin'
  },
  {
    path: "/challenges",
    component: Challenges,
    layout: "/admin",
  },
  {
    path: "/entries",
    component: Entries,
    layout: "/admin",
  },
  {
    path: "/entrycomments",
    component: EntryComments,
    layout: "/admin",
  },
  {
    path: "/entrydata",
    component: EntryData,
    layout: "/admin",
  },
  {
    path: "/userstories",
    component: UserStories,
    layout: "/admin",
  },
  
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: "ni ni-circle-08 text-pink",

  //   component: Tables,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Register,
  //   layout: "/auth"
  // }
];

export default routes;