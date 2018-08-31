import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'question/:id',
          name: 'questiondetail',
          component: () => import('./views/QuestionDetail.vue'),
          props: true
        },
      ]
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import('./views/AskQuestion.vue'),
    },
  ]
})
