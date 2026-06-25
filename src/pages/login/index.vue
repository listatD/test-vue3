<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginFormTypedSchema } from '@/utils/schemaZod'
import type { LoginForm } from '@/utils/types'

const mainStore = useMainStore()
const userService = useUserService()
const router = useRouter()

const loginDefaults: LoginForm = {
  username: '',
  phone: ''
}

const errorMessage = ref('')
const hasSubmitted = ref(false)
const isLoading = ref(false)
const fieldOptions = () => ({
  validateOnModelUpdate: hasSubmitted.value
})

const { errors, defineField, handleSubmit, resetForm, validate } = useForm({
  validationSchema: loginFormTypedSchema,
  initialValues: loginDefaults
})

const [usernameField] = defineField('username', fieldOptions)
const [phoneField] = defineField('phone', fieldOptions)

const enableValidateOnModelUpdate = () => {
  hasSubmitted.value = true
}

const username = computed({
  get: () => usernameField.value,
  set: value => {
    usernameField.value = value
    if (hasSubmitted.value) {
      nextTick(() => validate())
    }
  }
})

const phone = computed({
  get: () => phoneField.value,
  set: value => {
    phoneField.value = value
    if (hasSubmitted.value) {
      nextTick(() => validate())
    }
  }
})

const onLogin = handleSubmit(
  async values => {
    enableValidateOnModelUpdate()
    errorMessage.value = ''
    isLoading.value = true

    const { data, pending, error } = await userService.postLogin({
      username: values.username,
      phone: values.phone
    })

    isLoading.value = pending.value

    if (!error.value && data.value) {
      mainStore.setUserInfo(data.value)
      mainStore.setAccessToken({ token: String(data.value.id) })
      resetForm({ values: loginDefaults })
      await router.replace({ name: defUserPage.main.name })
    } else {
      errorMessage.value = error.value
    }

    isLoading.value = false
  },
  () => {
    enableValidateOnModelUpdate()
  }
)
</script>

<template>
  <main class="flex flex-1 items-center justify-center bg-auth-page p-6 text-auth-text">
    <section
      class="w-full max-w-[447px] overflow-hidden rounded bg-auth-card"
      aria-labelledby="login-title"
    >
      <header
        class="flex min-h-[51px] items-center justify-center border-b border-auth-border bg-auth-header"
      >
        <h1 id="login-title" class="m-0 text-[17px] font-normal leading-tight text-auth-title">
          {{ $t('page.loginTitle') }}
        </h1>
      </header>

      <form class="flex flex-col gap-5 px-6 pb-[30px] pt-[17px]" @submit.prevent="onLogin">
        <p class="m-0 text-[15px] leading-tight text-auth-description">
          {{ $t('page.loginDescription') }}
        </p>

        <BaseInput
          v-model="username"
          type="text"
          :placeholder="$t('label.username')"
          id="login-username"
          name="username"
          autocomplete="username"
          control-class="h-[41px] rounded border-0 bg-white focus-within:ring-brand-primary/35"
          input-class="rounded px-2.5 text-auth-text placeholder:text-auth-text"
          :error="errors.username"
        />

        <BaseInput
          v-model="phone"
          type="tel"
          :placeholder="$t('label.phoneNumber')"
          id="login-phone"
          name="phone"
          autocomplete="tel"
          control-class="h-[41px] rounded border-0 bg-white focus-within:ring-brand-primary/35"
          input-class="rounded px-2.5 text-auth-text placeholder:text-auth-text"
          :error="errors.phone"
        />

        <BaseAlert
          type="error"
          :show="!!errorMessage"
          :message="errorMessage ? $t(errorMessage) : ''"
        />

        <BaseButton type="submit" block :loading="isLoading" class="min-h-[41px] rounded">
          {{ isLoading ? $t('btn.loading') : $t('btn.login') }}
        </BaseButton>
      </form>
    </section>
  </main>
</template>

<route lang="json">
{
  "name": "login",
  "meta": {
    "public": true,
    "layout": "blank"
  }
}
</route>
