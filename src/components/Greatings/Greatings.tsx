'use client'

import { type FC, useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form'
import { MaskedInput, masks } from 'components/ui/input'
import { CheckboxWithText } from 'components/ui/checkbox'
import { Button } from 'components/ui/button'
import { cn, FormSchema } from 'lib/utils'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../widgets/WidgetReservation/store/authStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { CustomEventType, useEventBus } from 'lib/eventBus'

const GreetingsFormSchema = FormSchema.pick({
  login: true,
  agreement: true,
})

type GreetingsFormType = z.infer<typeof GreetingsFormSchema>

export const Greetings: FC = () => {
  const isFirstLoad = auth.hooks.useIsFirstLoad()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<GreetingsFormType>({
    resolver: zodResolver(GreetingsFormSchema),
    defaultValues: {
      login: '',
      agreement: true,
    },
  })

  const onSubmit = (formData: GreetingsFormType) => {
    setIsLoading(true)
    auth.actions.identify({ ...formData }).then(() => {
      setIsLoading(false)
      setIsOpen(false)
      form.resetField('login')
      setTimeout(() => {
        form.clearErrors()
      }, 10)
    })
  }

  useEffect(() => {
    if (!isFirstLoad) return

    const handler = () => {
      auth.actions.setFirstLoad()
      setIsOpen(true)
    }
    let timeout = 0
    timeout = window.setTimeout(handler, 15_000)
    return () => window.clearTimeout(timeout)
  }, [isFirstLoad])

  useEventBus(CustomEventType.AuthenticationValidationReceived, () => {
    setIsOpen(true)
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent forceMount className={cn('sm:max-w-[425px]')}>
        <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
          <DialogHeader>
            <DialogTitle className={'p-4'}>Вы уже были у нас?</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'space-y-4 mx-auto w-full'}
            >
              <div className={'grid gap-5'}>
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem className={'relative'}>
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
              </div>
              <div>
                <Button
                  variant={'default'}
                  className={'w-full'}
                  type={'submit'}
                >
                  Свяжитесь со мной
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DialogDescription>
          Введите номер телефона и мы с вами свяжемся
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
