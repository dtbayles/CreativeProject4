import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gallery from "../views/Gallery.vue";
import FAQ from "../views/FAQ.vue";
import Account from "../views/Account.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery
  },
  {
    path: "/FAQ",
    name: "FAQ",
    component: FAQ
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
