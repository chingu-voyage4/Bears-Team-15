import Vue from 'vue'
import Router from 'vue-router'
import Collection from '@/components/Collection'
import Lesson from '@/components/Lesson'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      children: [
        {
          path: '/',
          component: Dashboard
        },
        {
          path: 'lesson',
          name: 'Lesson',
          component: Lesson
        },
        {
          path: 'collection',
          name: 'Collection',
          component: Collection
        }
      ]
    }
  ]
})