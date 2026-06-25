import type { JsonPlaceholderUser } from '@/utils/types'

const userInfoSerializer = {
  read: (value: string): JsonPlaceholderUser | null => {
    try {
      const parsed = JSON.parse(value)

      return parsed && typeof parsed === 'object' ? parsed : null
    } catch {
      return null
    }
  },
  write: (value: JsonPlaceholderUser | null): string => JSON.stringify(value)
}

export const useMainStore = defineStore('main', () => {
  const isPageLoading = ref(true)
  const locale = useLocalStorage<string | null>('locale', null)
  const accessToken = useLocalStorage<string | null>('accessToken', null)
  const refreshToken = useLocalStorage<string | null>('refreshToken', null)
  const userInfo = useLocalStorage<JsonPlaceholderUser | null>('userInfo', null, {
    serializer: userInfoSerializer
  })

  const setAccessToken = (item: { token?: string; rt?: string }) => {
    if (item.token) accessToken.value = item.token
    if (item.rt) refreshToken.value = item.rt
  }

  const setUserInfo = (item: JsonPlaceholderUser | null) => {
    userInfo.value = item
  }

  const setAppLocale = (val: string | null) => {
    locale.value = val
  }

  const setLogOut = () => {
    accessToken.value = null
    refreshToken.value = null
    userInfo.value = null
  }

  const setPageLoading = (val: boolean) => {
    isPageLoading.value = val
  }

  return {
    isPageLoading,
    locale,
    accessToken,
    refreshToken,
    userInfo,
    setAccessToken,
    setUserInfo,
    setAppLocale,
    setLogOut,
    setPageLoading
  }
})
