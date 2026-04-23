import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GamesPage from '../pages/GamesPage.vue'
import PrivacyPage from '../pages/PrivacyPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/games', component: GamesPage },
    { path: '/privacy', component: PrivacyPage },
  ],
})
