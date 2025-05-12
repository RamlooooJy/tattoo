'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DefaultCarousel,
} from 'components/ui/carousel'
import 'react-photo-view/dist/react-photo-view.css'
import type { EmblaCarouselType } from 'embla-carousel'
import { type FC, type ReactElement, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from 'lib/utils'

type CarouselProps = {
  children: ReactElement[]
  useAutoplay?: boolean
  onChange?: (index: number) => void
  onSetApi?: (api: EmblaCarouselType | undefined) => void
  slideClassName?: string
}
const Carousel: FC<CarouselProps> = ({
  children,
  onChange,
  onSetApi,
  slideClassName,
  useAutoplay = true,
}) => {
  const plugin = React.useRef(
    useAutoplay ? Autoplay({ delay: 2000 }) : undefined,
  )
  const [api, setApi] = React.useState<EmblaCarouselType | undefined>()

  const onSetApiCallback = (api: EmblaCarouselType | undefined) => {
    setApi(api)
    onSetApi?.(api)
  }

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const slide = api.selectedScrollSnap()
      onChange?.(slide)
    }

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api, onChange])

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    const autoplay = api?.plugins()?.autoplay
    console.log(autoplay)

    if (autoplay) {
      if (inView) {
        autoplay?.play()
      } else {
        autoplay?.stop()
      }
    }
  }, [api, inView])

  const onMouseLeave = () => {
    if (!useAutoplay) return

    plugin.current?.play()
  }

  return (
    <DefaultCarousel
      ref={ref}
      setApi={onSetApiCallback}
      plugins={plugin.current ? [plugin.current] : undefined}
      className="w-full"
      onMouseEnter={plugin.current?.stop}
      onMouseLeave={onMouseLeave}
    >
      <CarouselContent>
        {Array.from(children).map((item, idx) => (
          <CarouselItem
            className={cn('basis-auto max-w-screen', slideClassName)}
            key={String(idx)}
          >
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </DefaultCarousel>
  )
}

export default Carousel
