import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import SongsView from '../views/SongsView.vue'
import BlogView from '../views/BlogView.vue'
import BlogPost from '../views/BlogPost.vue'
import NotFoundView from '../views/NotFoundView.vue'
import EmpathyHome from '../views/Empathy/EmpathyHome.vue'
import SurveyView from '../views/Empathy/SurveyView.vue'
import ZeroDegrees from '../views/Empathy/ZeroDegrees.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/empathy',
      name: 'empathy',
      component: EmpathyHome
    },
    {
      path: '/empathy/survey/:type', // Dynamic route for 'adult' or 'child'
      name: 'empathy-survey',
      component: SurveyView,
      props: true
    },
    {
      path: '/empathy/zero',
      name: 'empathy-zero',
      component: ZeroDegrees
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongsView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPost
    },
    // Catch-all for 404 errors
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router