import type { FC } from 'react'
import img from 'assets/logo.png'
import type { ClassicComponent } from 'types/types'
import { cn } from 'lib/utils'
import Image from 'next/image'

type LogoProps = {
  size?: string
} & ClassicComponent

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={'relative w-full h-full'}>
      <Image
        className={cn(
          'logo-image object-contain object-left-top invert',
          className,
        )}
        alt={''}
        src={img.src}
        fill // делает картинку заполняющей родительский контейнер
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

export default Logo
