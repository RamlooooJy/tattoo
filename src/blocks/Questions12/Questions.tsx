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
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'phone must be at least 2 characters.',
  }),
  question: z.string(),
})

const Questions = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      phone: '',
      question: '',
    },
  })

  const onSubmit = () => {}

  return (
    <div className={'p-4'}>
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Имя" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    inputMode="numeric"
                    placeholder="+7 (___) ___-__-__"
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Questions
