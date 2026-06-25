import { configure } from 'vee-validate'
import { z } from 'zod'
import { i18n } from '@/i18n'
import { zodMapError } from '@/utils/mapError'

z.config({
  customError: zodMapError(i18n.global.t)
})

configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false
})
