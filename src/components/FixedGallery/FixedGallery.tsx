import type { FC } from 'react'
import { cn } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

type ImageType = {
  id: number
  src: string
  title: string
  rotateClass?: string
}
import les1 from '../../assets/les1.png'
import les2 from '../../assets/les2.png'
import les3 from '../../assets/les3.png'
import les4 from '../../assets/les4.png'
import Image from 'next/image'
const images = [
  {
    id: 1,
    src: les1.src,
    title: 'Основы татуировки',
    rotateClass: 'rotate-[-20deg]',
  },
  {
    id: 2,
    src: les2.src,
    title: 'Уроки для начинающих',
    rotateClass: 'rotate-[5deg]',
  },
  {
    id: 3,
    src: les3.src,
    title: 'Практика в студии',
    rotateClass: 'rotate-[10deg]',
  },
  {
    id: 4,
    src: les4.src,
    title: 'Мастер-классы',
    rotateClass: 'rotate-[15deg]',
  },
]

const FixedGallery: FC = () => {
  return (
    <AnimationSlideY className="flex justify-center flex-col md:flex-row py-20">
      <div className="relative md:w-3/4 py-4 space-y-16">
        {images.map((imageItem, idx) => (
          <FixedGalleryItem
            key={imageItem.id}
            {...imageItem}
            className={cn(idx !== 0 ? 'absolute' : 'relative z-[1]')}
          />
        ))}
      </div>
    </AnimationSlideY>
  )
}

type GalleryItemProps = {
  className?: string
} & ImageType

const FixedGalleryItem: FC<GalleryItemProps> = ({
  id,
  title,
  src,
  rotateClass,
  className,
}) => {
  return (
    <div
      key={id}
      id={`section-${id}`}
      className={cn(
        'scroll-mt-20 top-0 size-full h-[400px]',
        rotateClass,
        className,
      )}
    >
      <Image
        fill
        src={src}
        alt={title}
        className="'w-full max-h-80', rounded shadow-lg object-cover"
      />
    </div>
  )
}

export default FixedGallery
