import PictureCarousel from 'components/PictureCarousel'
import { navigation } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

export const Result = () => {
  return (
    <section
      id={navigation.result}
      className={'bg-primary text-primary-foreground overflow-hidden'}
    >
      <div className={'container-max-width gap-4 grid content-start '}>
        <AnimationSlideY>
          <div className="p-3">
            <h2 className={'text-3xl font-semibold py-12'}>Результат курса</h2>
          </div>
        </AnimationSlideY>
        <PictureCarousel items={items} />
      </div>
    </section>
  )
}

import work1 from '../../assets/work1.png'
import work2 from '../../assets/work2.png'
import work3 from '../../assets/work3.png'
import work4 from '../../assets/work4.jpg'
import work5 from '../../assets/work5.jpg'
import work6 from '../../assets/work6.jpg'

const items = [
  {
    id: 1,
    title: 'борис',
    description: 'опыт до курса: 2 мес.',
    src: work1.src,
  },
  {
    id: 2,
    title: 'алла',
    description: 'опыт до курса: 1 нед.',
    src: work2.src,
  },
  {
    id: 3,
    title: 'Борис Рац',
    description: 'опыт до курса: 1 мес.',
    src: work3.src,
  },
  {
    id: 4,
    title: 'Борис Михайлов',
    description: 'опыт 2 года',
    src: work4.src,
  },
  {
    id: 5,
    title: 'Борис Клюев',
    description: 'опыт 5 лет',
    src: work5.src,
  },
  {
    id: 6,
    title: 'Борис Моисеев',
    description: 'без опыта',
    src: work6.src,
  },
]
