'use client'

import styles from '../widget.module.scss'
import { Input, MaskedInput, masks } from 'components/ui/input'
import { Button } from 'components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from 'lib/utils'
import type { z } from 'zod'
import { auth } from '../store/authStore'

const AuthFormSchema = FormSchema.pick({
  login: true,
  password: true,
})

/**
 * todo
 *  0) user -> roles
 *  1) validation
 *  2) registration
 *  3) tokenRefresh
 * */

type AuthFormType = z.infer<typeof AuthFormSchema>

export const Auth = () => {
  const form = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    shouldFocusError: false,
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit = (formData: AuthFormType) => {
    auth.actions.signIn(formData).then((r) => {
      if (!r) {
        form.setError('password', {
          type: 'manual',
          message: 'Неверный пароль',
        })
        return
      }

      form.reset({
        login: '',
        password: '',
      })
      setTimeout(() => {
        form.clearErrors()
      }, 0)
    })
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.title}>
        <h2>Вход</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'space-y-4 mx-auto w-full'}
        >
          <div className={styles.inputs}>
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem className={'relative'}>
                  <FormControl>
                    <MaskedInput
                      key={'phine'}
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
                <FormItem className={'relative'}>
                  <FormControl>
                    <Input
                      {...field}
                      type={'password'}
                      placeholder={'Пароль'}
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
          </div>
          <div className={'font-light text-[12px]'}>Забыли пароль?</div>
          <div className={styles.btnContainer}>
            <Button
              type={'submit'}
              className={
                'bg-widget-button-primary text-widget-primary-color hover:bg-widget-button-primary-hovered w-full p-2'
              }
            >
              Войти
            </Button>
            <div className={styles.register}>
              Нет аккаунта?
              <span className={styles.registerLink}>Регистрация</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
