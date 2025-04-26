import { course } from 'assets/urls'
import { Button } from 'components/ui/button'

export const Course = () => {
  return (
    <div
      className={
        'm-h-[var(--block-size)] bg-accent text-accent-foreground gap-4 grid content-start'
      }
    >
      <h2 className={'text-2xl font-medium p-12'}>Ты научишься</h2>
      <img src={course} className={'w-full max-h-80 object-contain'} alt={''} />
      <div className={'p-12 grid gap-3'}>
        <div className={'grid gap-2 text-lg'}>
          <p>
            Ты научишься бить классные татуировки! Ты станешь мастером! Тебе
            будут завидовать друзья!
          </p>
          <p>Не веришь? Приходи!</p>
        </div>
        <div>
          <Button size={'lg'}>Хочу на курс</Button>
        </div>
      </div>
    </div>
  )
}
