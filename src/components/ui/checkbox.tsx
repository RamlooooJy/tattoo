'use client'

import type * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from 'lib/utils'
import type { FC, ReactElement } from 'react'
import Link from 'next/link'
import { Label } from 'components/ui/label'

type Props = React.ComponentProps<typeof CheckboxPrimitive.Root>

function Checkbox({ className, ...props }: Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
//tattoo_user
//tattoo_user!@!

type CheckboxWithTextProps = {
  policy?: boolean
  note?: ReactElement
} & Props
const CheckboxWithText: FC<CheckboxWithTextProps> = ({
  note,
  policy,
  ...props
}) => {
  return (
    <div className="grid gap-1">
      <Label className="flex items-center text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <Checkbox {...props} />
        {policy ? (
          <>
            <span className={''}>Я согласен с</span>{' '}
            <Link
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              href="/policy"
              className="text-blue-600 hover:text-blue-800 text-[10px] block"
            >
              Политикой обработки данных
            </Link>
          </>
        ) : null}
      </Label>
      {note}
    </div>
  )
}

export { Checkbox, CheckboxWithText }
