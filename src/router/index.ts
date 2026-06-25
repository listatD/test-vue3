import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        const mainStore = useMainStore()

        return { name: mainStore.accessToken ? defUserPage.main.name : defAuthPage.login.name }
      }
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: defAuthPage.error404.name,
      component: () => import('@/pages/404.vue'),
      meta: {
        public: true,
        layout: defLayoutPage.default.name
      }
    }
  ]
})

router.beforeEach(to => {
  const mainStore = useMainStore()
  const isPublic = Boolean(to.meta.public)

  mainStore.setPageLoading(true)

  if (!isPublic && !mainStore.accessToken) {
    return { name: defAuthPage.login.name }
  }

  if (to.name === defAuthPage.login.name && mainStore.accessToken) {
    return { name: defUserPage.main.name }
  }
})

router.afterEach(() => {
  const mainStore = useMainStore()

  requestAnimationFrame(() => {
    mainStore.setPageLoading(false)
  })
})

router.onError(() => {
  const mainStore = useMainStore()

  mainStore.setPageLoading(false)
})

export default router
