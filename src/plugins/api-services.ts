import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import router from '@/router'

let refreshPromise: Promise<{ token: string; rt: string }> | null = null

const apiBaseUrl = import.meta.env.VITE_API_BASE || ''

export const apiBase: AxiosInstance = axios.create({
  baseURL: apiBaseUrl
})

const useUnauthorized = async (): Promise<never> => {
  const mainStore = useMainStore()
  mainStore.setLogOut()
  await router.replace({ name: defAuthPage.login.name })
  throw new Error('Unauthorized')
}

const isRefreshRequest = (url?: string) => Boolean(url?.includes('/refresh'))
const isAuthRequest = (url?: string) => Boolean(url?.includes('/login'))

const refreshTokens = async () => {
  const mainStore = useMainStore()

  if (!mainStore.refreshToken) {
    return await useUnauthorized()
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<{ token: string; rt: string }>(`${apiBaseUrl}/refresh`, {
        refreshToken: mainStore.refreshToken
      })
      .then(response => response.data)
      .finally(() => {
        refreshPromise = null
      })
  }

  const refreshRes = await refreshPromise

  mainStore.setAccessToken({
    token: refreshRes.token,
    rt: refreshRes.rt
  })

  return refreshRes
}

apiBase.interceptors.request.use(config => {
  const mainStore = useMainStore()

  if (mainStore.accessToken) {
    config.headers.Authorization = `Bearer ${mainStore.accessToken}`
  }

  return config
})

apiBase.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const status = error.response?.status || defHttpStatus.s500
    const originalRequest = error.config as AxiosRequestConfig & { hasRetried?: boolean }
    const url = originalRequest?.url

    if (status !== defHttpStatus.s401) {
      return Promise.reject(error)
    }

    if (originalRequest.hasRetried || isRefreshRequest(url) || isAuthRequest(url)) {
      return await useUnauthorized()
    }

    try {
      await refreshTokens()
      originalRequest.hasRetried = true
      return await apiBase(originalRequest)
    } catch {
      return await useUnauthorized()
    }
  }
)
