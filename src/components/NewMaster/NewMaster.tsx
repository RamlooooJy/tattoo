'use client'

import { type FC, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog'
import { cn, FormSchema } from 'lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { Input, MaskedInput, masks } from 'components/ui/input'
import { Button } from 'components/ui/button'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from 'widgets/WidgetReservation/store/authStore'

const SignUpFormSchema = FormSchema.pick({
  phone: true,
  name: true,
  password: true,
})

type SignUpFormType = z.infer<typeof SignUpFormSchema>

export const NewMaster: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onCreate = (formData: SignUpFormType) => {
    setIsLoading(true)
    auth.actions
      .createUser({
        login: formData.phone,
        name: formData.name.trim(),
        password: formData.password,
      })
      .then((res) => {
        alert(res ? 'Создан' : 'Ошибка!')
        if (res) {
          form.reset()
        }
        setIsLoading(false)
      })
  }

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      phone: '',
      name: '',
      password: '',
    },
  })

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>Добавить нового мастера</Button>
        </DialogTrigger>
        <DialogContent forceMount className={cn('sm:max-w-[425px]')}>
          <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
            <DialogHeader>
              <DialogTitle className={'p-4'}>Ну и кто он?</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onCreate)}
                className={'space-y-4 mx-auto w-full'}
              >
                <div className={'grid gap-5'}>
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
                      <FormItem className={'relative'}>
                        <FormLabel>Логин / Номер</FormLabel>
                        <FormControl>
                          <MaskedInput
                            key={'phone'}
                            {...field}
                            mask={masks.phone}
                            placeholder={'+7 ('}
                            type="tel"
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage
                          className={
                            'text-[10px] absolute top-full left-0 right-0 whitespace-nowrap'
                          }
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input
                            type={'text'}
                            placeholder="пароль?"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    variant={'default'}
                    className={'w-full'}
                    type={'submit'}
                  >
                    Внести плаТельщика
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewMaster
