import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/components/LandingPage.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'Landing',
        component: LandingPage,
      },

      {
          path: '/player-info/:mode',
          name: 'PlayerInfo',
          component: PlayerInfo,
      },
  ],
})

export default router
