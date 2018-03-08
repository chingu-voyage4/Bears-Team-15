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
          name: 'home',
          component: Dashboard
        },
        {
          path: '/collection/new',
          name: 'collectionNew',
          component: CollectionNew
        },
        {
          path: '/collection/:id',
          component: Collection,
          props: true,
          children: [
            {
              path: '/',
              name: 'collection',
              component: Lesson,
              props: true,
            },
            {
              path: 'cards',
              name: 'collectionView',
              component: CollectionView,
              props: true,
            },
            {
              path: 'edit',
              name: 'collectionEdit',
              component: CollectionEdit,
              props: true,
            },
          ]
        },
      ]
    }
  ]
})
