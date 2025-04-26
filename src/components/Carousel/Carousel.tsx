import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'components/ui/carousel'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import type { EmblaCarouselType } from 'embla-carousel'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { AnimatePresence, motion, useInView } from 'framer-motion'

function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }))
  const [api, setApi] = React.useState<EmblaCarouselType | undefined>()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const autoplay = api?.plugins()?.autoplay

    if (autoplay) {
      if (inView) {
        autoplay.play()
      } else {
        autoplay.stop()
      }
    }
  }, [api, inView])

  return (
    <div className="grid gap-4" ref={ref}>
      <Carousel
        setApi={(embraApi) => setApi(embraApi)}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          <PhotoProvider>
            {items.map((item) => (
              <CarouselItem key={item.id}>
                <PhotoView key={item.id} src={item.src}>
                  <img
                    className="object-cover h-[400px] w-full"
                    src={item.src}
                    alt=""
                  />
                </PhotoView>
              </CarouselItem>
            ))}
          </PhotoProvider>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="userdata grid gap-2 p-12 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            transition={{
              duration: 0.3,
              ease: [0, 0.31, 0.7, 1.01],
            }}
            initial={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              position: 'absolute',
              y: 30,
            }}
          >
            <h3 className={'title text-lg font-medium'}>
              {items[currentSlide].title}
            </h3>
            <p className={'text-base'}>{items[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>
        <Button variant={'secondary'} size={'lg'}>
          Хочу так же
        </Button>
      </div>
    </div>
  )
}

const items = [
  {
    id: 1,
    title: 'борис',
    description: 'опыт до курса: 2 мес.',
    src: 'https://artofpain.ru/sites/default/files/botanika.png',
  },
  {
    id: 2,
    title: 'алла',
    description: 'опыт до курса: 1 нед.',
    src: 'https://tattoovspb.ru/assets/images/articles/dima88/kf_hd7rglig.jpg',
  },
  {
    id: 3,
    title: 'Борис Рац',
    description: 'опыт до курса: 1 мес.',
    src: 'https://barakatattoo.ru/files/new_work_styles/43_image.jpg?1729516870',
  },
  {
    id: 4,
    title: 'Борис Михайлов',
    description: 'опыт 2 года',
    src: 'https://cdn1.ozone.ru/s3/multimedia-1-k/6985619120.jpg',
  },
  {
    id: 5,
    title: 'Борис Клюев',
    description: 'опыт 5 лет',
    src: 'https://kursy-tatu.com/wp-content/uploads/2023/10/c9ByYl86tvk.jpg',
  },
  {
    id: 6,
    title: 'Борис Моисеев',
    description: 'без опыта',
    src: 'https://i.pinimg.com/236x/35/c9/e0/35c9e0bcc09e5015a17ba77d1df3ce7c.jpg',
  },
]
export default CarouselPlugin
