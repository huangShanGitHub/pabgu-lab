import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import("../components/Index"),
  },
]

const router = new VueRouter({
  routes,
})

export default router
