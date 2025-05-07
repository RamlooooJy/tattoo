import { FormSchema } from 'lib/utils'
import type { z } from 'zod'

export const DialogSchema = FormSchema.pick({
  name: true,
  phone: true,
  agreement: true,
  course: true,
})

export type DialogType = z.infer<typeof DialogSchema>
