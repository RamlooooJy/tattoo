'use client'
import { Button } from 'components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input, masks } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { CheckboxWithText } from 'components/ui/checkbox'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'phone must be at least 2 characters.',
  }),
  question: z.string(),
  agreement: z.boolean().refine((val) => val, {
    message: 'You must agree to continue.',
  }),
})

const Questions = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      phone: '',
      question: '',
      agreement: false,
    },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }

  console.log(form.formState)

  return (
    <div className={'grid gap-6 p-4'}>
      <div>
        <h2 className={'text-2xl'}>Остались вопросы?</h2>
        <p>
          Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
          все вопросы
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input type={'text'} placeholder="Оля" {...field} />
                </FormControl>
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
                  <Input
                    {...field}
                    placeholder="+7 (___) ___-__-__"
                    mask={masks.phone}
                    type="tel"
                    inputMode="numeric"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Вопрос" {...field} />
                </FormControl>
                <FormDescription>
                  Опиши свой вопрос и мы ответим
                </FormDescription>
                <FormMessage />
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
                    checked={field.value}
                    onChange={field.onChange}
                    policy={true}
                    note={
                      'You agree to our Terms of Service and Privacy Policy.'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Questions
