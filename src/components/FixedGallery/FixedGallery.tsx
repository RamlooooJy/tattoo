'use client'
import { type FC, useContext, useRef } from 'react'
import { cn } from 'lib/utils'
import les1 from '../../assets/les1.png'
import les2 from '../../assets/les2.png'
import les3 from '../../assets/les3.jpeg'
import les4 from '../../assets/les4.png'
import Image from 'next/image'
import type { ClassicComponent } from 'types/types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MainContext } from '../../contexts/mainProvider'

type ImageType = {
  id: number
  src: string
  title: string
  rotateClass?: string
}

const images = [
  {
    id: 1,
    src: les1.src,
    title: 'Основы татуировки',
  },
  {
    id: 2,
    src: les2.src,
    title: 'Уроки для начинающих',
  },
  {
    id: 3,
    src: les3.src,
    title: 'Практика в студии',
  },
  {
    id: 4,
    src: les4.src,
    title: 'Мастер-классы',
  },
]

const FixedGallery: FC = () => {
  const { isMobile, isHydrated } = useContext(MainContext)
  const main = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!isHydrated || isMobile) return
      const items = gsap.utils.toArray(
        '[data-gsap=gallery-item]',
      ) as HTMLDivElement[]

      items.forEach((item, index) => {
        const isFirstLine = index < 2
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: `${isFirstLine ? 'bottom' : 'top'} 50%`,
              scrub: true,
            },
            defaults: {
              duration: 1.5 + 0.2 * index,
            },
          })
          .from(item, {
            opacity: 0,
            borderRadius: 400,
            x: index % 2 === 0 ? -150 : 150,
            y: 200, // Пример: увеличиваем смещение по оси Y с индексом
            rotate: index % 2 === 0 ? -10 : 10, // Пример: чередуем вращение
          })
      })
    },
    { scope: main, dependencies: [isMobile] },
  )

  return (
    // <AnimationSlideY className="flex justify-center flex-col md:flex-row py-20">
    <div className="flex justify-center flex-col md:flex-row py-20">
      <div
        data-gsap={'gallery-container'}
        ref={main}
        className="grid relative md:w-full py-4 lg:grid-cols-2 gap-4"
      >
        {images.map((imageItem) => (
          <FixedGalleryItem
            key={imageItem.id}
            {...imageItem}
            // className={cn(idx !== 0 ? 'absolute' : 'relative z-[1]')}
          />
        ))}
      </div>
    </div>
  )
}

type GalleryItemProps = ClassicComponent & ImageType

const FixedGalleryItem: FC<GalleryItemProps> = ({
  id,
  title,
  src,
  className,
}) => {
  return (
    <div
      data-gsap={'gallery-item'}
      key={id}
      id={`section-${id}`}
      className={cn(
        'relative rounded top-0 size-full h-[400px] shadow-lg overflow-hidden',
        className,
      )}
    >
      <Image fill src={src} alt={title} className="size-full object-cover" />
    </div>
  )
}

export default FixedGallery
