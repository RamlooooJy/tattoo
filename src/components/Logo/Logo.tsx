import type { FC } from 'react'
import img from 'assets/logo.png'

type LogoProps = {
  size?: string
}

const Logo: FC<LogoProps> = ({ size = '100px' }) => {
  return (
    <div className="flex">
      <img width={size} className={''} src={img.src} alt="" />
    </div>
  )
}

export default Logo
