import type { FC } from 'react'
import img from 'assets/logo.png'
import type { ClassicComponent } from 'types/types'
import { cn } from 'lib/utils'

type LogoProps = {
  size?: string
} & ClassicComponent

const Logo: FC<LogoProps> = ({ size = '100%', className }) => {
  return (
    <div className="flex">
      <img
        width={size}
        className={cn('invert', className)}
        src={img.src}
        alt=""
      />
    </div>
  )
}

export default Logo
