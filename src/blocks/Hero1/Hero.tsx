import { Button } from 'components/ui/button'

export const Hero = () => {
  return (
    <div
      className={
        'bg-[image:var(--background-hero)] screenHeight grid items-center p-4'
      }
    >
      <div className={'grid gap-4 '}>
        <div className={'grid gap-3'}>
          <h2 className={'text-3xl font-bold'}>
            Запишитесь на{' '}
            <span className={'text-chart-1'}>бесплатно пробное</span> занятие
          </h2>
          <h2 className={'font-bold text-3xl'}>
            ПРАКТИКУМ ПРОХОДИТ В САНКТ ПЕТЕРБУРГЕ
          </h2>
          <p className={'text-base'}>
            Набейте свою первую татуировку под руководством мастеров taurus
            tattoo academy
          </p>
        </div>
        <div>
          <Button size={'lg'}>Записаться</Button>
        </div>
      </div>
    </div>
  )
}
