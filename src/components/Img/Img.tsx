import Image from 'next/image'
import type { FC } from 'react'
import type { ClassicComponent } from 'types/types'
import { cn } from 'lib/utils'

type ImgProps = {
  src: string
  alt?: string
  fit?: 'cover' | 'contain'
} & ClassicComponent

export const Img: FC<ImgProps> = ({
  src,
  alt = 'alt',
  className,
  fit = 'cover',
}) => {
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <div className={cn('relative size-full', className)}>
      <Image fill src={src} alt={alt} className={cn('size-full', fitClass)} />
    </div>
  )
}
