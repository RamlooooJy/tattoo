'use client'
import { Button } from 'components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { Input, MaskedInput, masks } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { CheckboxWithText } from 'components/ui/checkbox'
import { FormSchema, navigation } from 'lib/utils'

const QuestionSchema = FormSchema.pick({
  name: true,
  phone: true,
  question: true,
  agreement: true,
})

const Questions = () => {
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      name: '',
      phone: '',
      question: '',
      agreement: false,
    },
  })

  const onSubmit = (data: z.infer<typeof QuestionSchema>) => {
    // todo form
    alert(`Форма связи не настроена, ${JSON.stringify(data)}`)
  }

  return (
    <section id={navigation.questions} className={'grid gap-6 p-4'}>
      <div>
        <h2 className={'text-2xl'}>Остались вопросы?</h2>
        <p>
          Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
          все вопросы
        </p>
      </div>
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
                  <Textarea placeholder="Напишите нам..." {...field} />
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
    </section>
  )
}

export default Questions
