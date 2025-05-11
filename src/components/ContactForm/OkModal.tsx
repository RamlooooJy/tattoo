'use client'

import { type FC, useEffect, useState } from 'react'
import { Dialog, DialogContent } from 'components/ui/dialog'
import { ContactOk } from 'components/ContactForm/ContactOk'

export const OkModal: FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }
  }, [isOpen])

  return isOpen ? (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <ContactOk />
      </DialogContent>
    </Dialog>
  ) : null
}
