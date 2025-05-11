'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { Input, MaskedInput, masks } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { CheckboxWithText } from 'components/ui/checkbox'
import { Button } from 'components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from 'lib/utils'
import type { ContactFormType } from 'components/ContactForm/ContactFormSchema'
import type { z } from 'zod'
import contactStore from '../../store/contact.store'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'
import { ContactOk } from 'components/ContactForm/ContactOk'

const QuestionSchema = FormSchema.pick({
  name: true,
  phone: true,
  question: true,
  agreement: true,
})

export const ContactQuestionForm = () => {
  const [wasSent, setWasSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      name: '',
      phone: '',
      question: '',
      agreement: false,
    },
  })

  const onSubmit = (formData: ContactFormType) => {
    setIsLoading(true)
    contactStore(formData).then(() => {
      // form.reset()
      setIsLoading(false)
      setWasSent(true)
    })
  }

  return (
    <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
      <AnimationSlideY>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input type={'text'} placeholder="Оля?" {...field} />
                  </FormControl>
                  <FormMessage className={'text-xs'} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <MaskedInput
                      {...field}
                      placeholder="+7 (___) ___-__-__"
                      mask={masks.phone}
                      type="tel"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage className={'text-xs'} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      maxLength={95}
                      placeholder="Напишите нам..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={'text-xs'} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <CheckboxWithText
                      policy={true}
                      note={<FormMessage className={'text-xs'} />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </AnimationSlideY>
      {wasSent ? <ContactOk /> : null}
    </div>
  )
}
