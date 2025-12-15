import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import ProductQueryView from "../views/ProductQueryView.vue";
import OrderQueryView from "../views/OrderQueryView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/products/query/:id", component: ProductQueryView },
    { path: "/orders/query/:id", component: OrderQueryView },
  ],
});
