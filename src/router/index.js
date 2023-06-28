import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/table",
    name: "table",
    component: () => import("../demo/Table.vue"),
  },
]

const router = new VueRouter({
  routes,
})

export default router
