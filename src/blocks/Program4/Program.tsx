import FixedGallery from '../../components/FixedGallery'
import Stepper from 'components/Stepper/Stepper'

export const Program = () => {
  return (
    <div
      className={
        'bg-primary text-primary-foreground gap-4 py-12 grid content-start overflow-hidden'
      }
    >
      <div className="block-wrapper">
        <h2 className={'text-3xl font-medium'}>ПРОГРАММА КУРСА</h2>
        <h3 className={'text-2xl font-medium text-muted-foreground'}>
          по блокам
        </h3>
      </div>
      <FixedGallery />
      <div className="block-wrapper">
        <Stepper />
      </div>
    </div>
  )
}
