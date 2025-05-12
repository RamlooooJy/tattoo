'use client'

import { cloneElement, type FC, type ReactElement, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { ContactForm } from 'components/ContactForm/ContactForm'
import type { ContactModalProps } from 'components/ContactForm/ContactFormSchema'

const ContactFormModal: FC<ContactModalProps> = ({
  isOpen,
  onOpenChangeAction,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChangeAction}>
      <DialogContent forceMount className="sm:max-w-[425px]">
        <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
          <DialogHeader>
            <DialogTitle>Записаться на курс</DialogTitle>
            <DialogDescription>
              Заполните форму и мы с вами свяжемся для дальнейшего
              сотрудничества
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            onOpenChangeAction={onOpenChangeAction}
            onLoadChangeAction={setIsLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

type Trigger = {
  children: ReactElement<React.HTMLAttributes<HTMLButtonElement>>
}
export const ContactFormTrigger: FC<Trigger> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {cloneElement(children, {
        onClick() {
          setIsOpen(true)
        },
      })}
      {isOpen ? (
        <ContactFormModal isOpen={isOpen} onOpenChangeAction={setIsOpen} />
      ) : null}
    </>
  )
}
