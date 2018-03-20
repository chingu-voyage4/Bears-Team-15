import Vue from 'vue'
import Router from 'vue-router'
import Collection from '@/components/Collection'
import CollectionEdit from '@/components/CollectionEdit'
import CollectionNew from '@/components/CollectionNew'
import CollectionView from '@/components/CollectionView'
import Lesson from '@/components/Lesson'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/Dashboard'
import DashboardPrivate from '@/components/DashboardPrivate'
import DashboardPublic from '@/components/DashboardPublic'
import Form from '@/components/Form'
import FormLogin from '@/components/FormLogin'
import FormRegister from '@/components/FormRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Homepage,
      children: [
        {
          path: '/',
          component: Dashboard,
          children: [
            {
              path: '/',
              name: 'home',
              component: DashboardPrivate,
            },
            {
              path: 'public',
              name: 'public',
              component: DashboardPublic,
            }
          ]
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
        {
          path: 'login',
          component: Form,
          children: [
            {
              path: '/login',
              name: 'login',
              component: FormLogin,
            },
            {
              path: '/register',
              name: 'register',
              component: FormRegister,
            }
          ]
        }
      ]
    }
  ]
})
