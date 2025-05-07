import type * as React from 'react'

import { cn } from 'lib/utils'
import { IMaskInput } from 'react-imask'
import type { FC } from 'react'

type InputProps = Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void
  mask?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'tel'
}

const masks = {
  phone: '+{7} (000) 000-00-00',
}

const defaultClassName = cn(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
)

const Input: FC<InputProps> = ({ className, onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={(ev) => onChange(ev.target.value)}
      data-slot="input"
      className={cn(defaultClassName, className)}
    />
  )
}

const MaskedInput: FC<InputProps> = ({
  mask,
  className,
  onChange,
  ...props
}) => {
  return (
    <IMaskInput
      {...props}
      mask={mask}
      lazy={false}
      radix="."
      unmask={false}
      onAccept={(value) => onChange(value)}
      data-slot="input"
      className={cn(defaultClassName, className)}
    />
  )
}

export { MaskedInput, Input, masks }
