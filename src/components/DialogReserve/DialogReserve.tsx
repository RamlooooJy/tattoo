'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'
import { type FC, useEffect, useState } from 'react'
import { Input, MaskedInput, masks } from 'components/ui/input'
import {
  DialogSchema,
  type DialogType,
} from 'components/DialogReserve/DialogSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { CheckboxWithText } from 'components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import type { HeroProps } from 'types/types'
import contactStore from '../../store/contact.store'

const key = 'dialogReserve'

type DialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
} & Pick<HeroProps, 'courses'>

const DialogReserve: FC<DialogProps> = ({ isOpen, onOpenChange, courses }) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<DialogType>({
    resolver: zodResolver(DialogSchema),
    defaultValues: {
      name: '',
      phone: '',
      course: '',
      agreement: false,
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        form.reset(JSON.parse(saved))
      } catch (e) {
        console.warn('Ошибка при ч тении localStorage:', e)
      }
    }
  }, [form])

  const values = form.watch()
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values))
  }, [values])

  const onSubmit = (formData: DialogType) => {
    setIsLoading(true)
    contactStore(formData).then(() => {
      form.reset()
      setIsLoading(false)
      onOpenChange(false)
      localStorage.removeItem(key)
    })
  }

  return (
    <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Записаться на курс</DialogTitle>
            <DialogDescription>
              Заполните форму и мы с вами свяжемся для дальнейшего
              сотрудничества
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
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
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Курс</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={'w-full truncate'}>
                            <SelectValue
                              className={
                                'block overflow-hidden text-ellipsis whitespace-nowrap'
                              }
                              placeholder="Выберите курс"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses?.map((course) => (
                            <SelectItem key={course.id} value={course.title}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

              <DialogFooter>
                <Button type="submit">Отправить</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogReserve
