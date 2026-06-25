import type {
  FetchError,
  JsonPlaceholderTodo,
  JsonPlaceholderUser,
  LoginPayload,
  RunAsyncOptions,
  ServiceResponse
} from '@/utils/types'
import { apiBase } from '@/plugins/api-services'

export const useUserService = () => {
  const handleError = (err: FetchError, options?: RunAsyncOptions): string => {
    const fallbackMessage = options?.errorOptions?.fallbackMessage

    return mapError(fallbackMessage && !err?.message ? { ...err, message: fallbackMessage } : err)
  }

  const normalizeError = (err: any): FetchError => ({
    status: err?.response?.status || err?.status,
    message: err?.response?.data?.error || err?.response?.data?.message || err?.message
  })

  const runTask = async <T>(
    task: () => Promise<T>,
    options?: RunAsyncOptions<T>
  ): Promise<ServiceResponse<T>> => {
    const data = ref<T | null>(null) as Ref<T | null>
    const pending = ref(true)
    const error = ref('')

    try {
      const result = await task()
      data.value = result
    } catch (err: any) {
      error.value = handleError(normalizeError(err), options)
    } finally {
      pending.value = false
    }

    return { data, pending, error }
  }

  const normalizePhone = (value: string) => value.replace(/\s+/g, '').trim()

  return {
    async getTodos(options?: RunAsyncOptions<JsonPlaceholderTodo[]>) {
      return runTask<JsonPlaceholderTodo[]>(
        async () => {
          const response = await apiBase.get<JsonPlaceholderTodo[]>('todos')
          return response.data
        },
        {
          ...options,
          errorOptions: {
            ...options?.errorOptions,
            fallbackMessage: 'errorTodosLoadFailed'
          }
        }
      )
    },

    async postTodo(
      values: Pick<JsonPlaceholderTodo, 'userId' | 'title' | 'completed'>,
      options?: RunAsyncOptions<JsonPlaceholderTodo>
    ) {
      return runTask<JsonPlaceholderTodo>(
        async () => {
          const response = await apiBase.post<JsonPlaceholderTodo>('todos', values)
          return response.data
        },
        {
          ...options,
          errorOptions: {
            ...options?.errorOptions,
            fallbackMessage: 'errorCreateTodoFailed'
          }
        }
      )
    },

    async postLogin(values: LoginPayload, options?: RunAsyncOptions<JsonPlaceholderUser>) {
      return runTask<JsonPlaceholderUser>(async () => {
        const response = await apiBase.get<JsonPlaceholderUser[]>('users')
        const user = response.data.find(
          item =>
            item.username.toLowerCase() === values.username.trim().toLowerCase() &&
            normalizePhone(item.phone) === normalizePhone(values.phone)
        )

        if (!user) {
          throw { message: 'errorLogin' }
        }

        return user
      }, options)
    }
  }
}
