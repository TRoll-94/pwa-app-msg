const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dialog', component: () => import('pages/DialogPage.vue'), name: 'dialog'},
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'home'},
    ],
    meta: { requiredAuth: true }
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {path: 'login', component: () => import('pages/LoginPage.vue'), name: 'login'},
      {path: 'register', component: () => import('pages/RegisterPage.vue'), name: 'register'},
      {path: 'password-reset', component: () => import('pages/ResetPasswordPage.vue'), name: 'password.reset'},
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
