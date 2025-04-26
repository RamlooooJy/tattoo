'use client'
import CarouselPlugin from 'components/Carousel'

export const Result = () => {
  return (
    <div
      className={
        'm-h-[var(--block-size)] bg-primary text-primary-foreground gap-4 grid content-start overflow-hidden'
      }
    >
      <div className="block-wrapper">
        <h2 className={'text-3xl font-medium'}>Результат курса</h2>
      </div>
      <CarouselPlugin />
    </div>
  )
}
