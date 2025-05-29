'use client'

import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { type FC, useState } from 'react'
import { Button } from '../ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from 'components/Carousel'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'
import Image from 'next/image'
import { cn } from 'lib/utils'
import styles from './picture-carousel.module.scss'

type CarouselProps = {
  items: Array<{
    id: number
    src: string
    title: string
    description: string
  }>
}
const PictureCarousel: FC<CarouselProps> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="grid gap-4">
      <PhotoProvider>
        <Carousel
          slideClassName={'h-[400px] max-w-[450px] relative'}
          useAutoplay={false}
          onChange={setCurrentSlide}
        >
          {items.map((item) => (
            <PhotoView key={item.id} src={item.src}>
              <div className={cn('size-full', styles.picture)}>
                <Image className="object-cover" src={item.src} fill alt="" />
                <div
                  className={cn(
                    'hidden xl:grid justify-center content-center text-center gap-2 select-none cursor-pointer',
                    styles.description,
                  )}
                >
                  <h3 className={'text-3xl font-bold capitalize'}>
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </PhotoView>
          ))}
        </Carousel>
      </PhotoProvider>
      <div className="userdata grid gap-2 p-12 overflow-hidden xl:hidden">
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
        <ContactFormTrigger>
          <Button variant={'secondary'} size={'lg'}>
            Хочу так же
          </Button>
        </ContactFormTrigger>
      </div>
    </div>
  )
}

export default PictureCarousel
