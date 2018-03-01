import Vue from 'vue'
import Router from 'vue-router'
import Collection from '@/components/Collection'
import CollectionEdit from '@/components/CollectionEdit'
import CollectionNew from '@/components/CollectionNew'
import CollectionView from '@/components/CollectionView'
import Lesson from '@/components/Lesson'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Homepage,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Dashboard
        },
        {
          path: '/collection',
          component: Collection,
          children: [
            {
              path: '/',
              name: 'Collection',
              component: Lesson
            },
            {
              path: 'cards',
              name: 'CollectionView',
              component: CollectionView
            },
            {
              path: 'edit',
              name: 'CollectionEdit',
              component: CollectionEdit
            },
          ]
        },
        {
          path: '/collection/new',
          name: 'CollectionNew',
          component: CollectionNew
        },
      ]
    }
  ]
})
