import { FormSchema } from 'lib/utils'
import type { z } from 'zod'

export const ContactFormSchema = FormSchema.pick({
  name: true,
  phone: true,
  agreement: true,
  course: true,
})

export type ContactFormType = z.infer<typeof ContactFormSchema>

export type ContactModalProps = {
  onOpenChangeAction?: (isOpen: boolean) => void
  isOpen: boolean
}

export type ContactFormProps = {
  onLoadChangeAction?: (state: boolean) => void
} & Pick<ContactModalProps, 'onOpenChangeAction'>
