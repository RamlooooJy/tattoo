import type { FC } from 'react'
import { cn } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

type ImageType = {
  id: number
  src: string
  title: string
  rotateClass?: string
}
const images = [
  {
    id: 1,
    src: 'https://static.tildacdn.com/tild3036-6233-4838-b539-306663313761/b4BllFDcq9I.jpg',
    title: 'Основы татуировки',
    rotateClass: 'rotate-[-20deg]',
  },
  {
    id: 2,
    src: 'https://vse-kursy.com/uploads/posts/2020-07/1594297361_tattoo-3268988_1920.jpg',
    title: 'Уроки для начинающих',
    rotateClass: 'rotate-[5deg]',
  },
  {
    id: 3,
    src: 'https://shoptattoo.ru/upload/medialibrary/965/9658865ab342ecb98dfe97b8525fe80a.jpg',
    title: 'Практика в студии',
    rotateClass: 'rotate-[10deg]',
  },
  {
    id: 4,
    src: 'https://haycaptaintattoo.com/images/soveti/obuchenie-tatu-15.jpg',
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
    <section
      key={id}
      id={`section-${id}`}
      className={cn('scroll-mt-20 top-0', rotateClass, className)}
    >
      <img
        src={src}
        alt={title}
        className="'w-full max-h-80', rounded shadow-lg"
      />
    </section>
  )
}

export default FixedGallery
