'use client'

import { Button } from 'components/ui/button'
import { cn, navigation } from 'lib/utils'
import { CoursesContext } from '../../contexts/courses'
import { useContext } from 'react'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'
import { MainContext } from '../../contexts/mainProvider'

const Price = () => {
  const { isMobile, isHydrated } = useContext(MainContext)
  const data = useContext(CoursesContext)

  return (
    <section
      id={navigation.price}
      className={cn('bg-primary text-primary-foreground relative')}
    >
      <div className="container-max-width py-12 gap-4 grid content-start ">
        <AnimationSlideY className="p-3">
          <h2 className="text-3xl font-semibold">Стоимость курса</h2>
        </AnimationSlideY>
        {data?.courses.map((course) => (
          <AnimationSlideY
            key={course.id}
            className={cn(
              'sticky top-[var(--size-header)]',
              'grid justify-self-center w-full grid-cols-1 md:max-w-10/12',
              'p-12 background-before var(--background-course)',
              isHydrated && isMobile ? 'sm:relative' : ' ',
              course.textStyle,
              course.backgroundStyle,
            )}
          >
            <div className={'relative  grid gap-6'}>
              <h3 className={'text-2xl font-semibold'}>{course.title}</h3>
              <div className={'grid grid-cols-2'}>
                {course.points.map((point) => (
                  <div key={point.title} className={'grid gap-2 label p-3'}>
                    <p className={'text-xs leading-tight'}>{point.title}</p>
                    <p className={'text-lg leading-tight'}>{point.text}</p>
                  </div>
                ))}
              </div>
              <div className={'grid gap-3 px-3'}>
                <div className="price">
                  <p className={'text-3xl'}>{course.price}</p>
                  <p className={'text-xs'}>{course.description}</p>
                </div>
                <div>
                  <ContactFormTrigger>
                    <Button size={'lg'} variant={'outline'}>
                      Оставить заявку
                    </Button>
                  </ContactFormTrigger>
                </div>
              </div>
            </div>
          </AnimationSlideY>
        ))}
      </div>
    </section>
  )
}

export default Price
