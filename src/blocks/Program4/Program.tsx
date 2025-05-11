import FixedGallery from '../../components/FixedGallery'
import Stepper from 'components/Stepper/Stepper'
import { navigation } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

export const Program = () => {
  return (
    <section
      id={navigation.program}
      className={
        'bg-secondary text-secondary-foreground gap-4 py-12 grid content-start overflow-hidden'
      }
    >
      <div className="p-3">
        <AnimationSlideY>
          <h2 className={'text-3xl font-semibold'}>ПРОГРАММА КУРСА</h2>
          <h3 className={'text-2xl font-semibold text-muted-foreground'}>
            по блокам
          </h3>
        </AnimationSlideY>
      </div>
      <FixedGallery />
      <div className="p-3">
        <Stepper />
      </div>
    </section>
  )
}
