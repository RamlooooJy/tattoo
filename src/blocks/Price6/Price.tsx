'use client'

import { Button } from 'components/ui/button'
import { cn, navigation } from 'lib/utils'
import { CoursesContext } from '../../contexts/courses'
import { useContext } from 'react'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'

const Price = () => {
  const data = useContext(CoursesContext)
  return (
    <section
      id={navigation.price}
      className={cn(
        'py-6 bg-primary text-primary-foreground gap-4 grid content-start overflow-hidden',
      )}
    >
      <div className="block-wrapper">
        <h2 className="text-3xl font-semibold">Стоимость курса</h2>
      </div>
      {data?.courses.map((course) => (
        <div
          key={course.id}
          className={cn(
            'grid justify-self-center w-full grid-cols-1 md:max-w-10/12',
            'overflow-hidden p-12 background-before var(--background-course)',
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
        </div>
      ))}
    </section>
  )
}

export default Price
