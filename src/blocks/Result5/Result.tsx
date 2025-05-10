import PictureCarousel from 'components/PictureCarousel'
import { navigation } from 'lib/utils'
import { SlideY } from 'components/Animations/SlideY'

export const Result = () => {
  return (
    <section
      id={navigation.result}
      className={
        'bg-primary text-primary-foreground gap-4 grid content-start overflow-hidden'
      }
    >
      <SlideY>
        <div className="p-3">
          <h2 className={'text-3xl font-medium py-12'}>Результат курса</h2>
        </div>
      </SlideY>
      <PictureCarousel items={items} />
    </section>
  )
}

const items = [
  {
    id: 1,
    title: 'борис',
    description: 'опыт до курса: 2 мес.',
    src: 'https://artofpain.ru/sites/default/files/botanika.png',
  },
  {
    id: 2,
    title: 'алла',
    description: 'опыт до курса: 1 нед.',
    src: 'https://tattoovspb.ru/assets/images/articles/dima88/kf_hd7rglig.jpg',
  },
  {
    id: 3,
    title: 'Борис Рац',
    description: 'опыт до курса: 1 мес.',
    src: 'https://barakatattoo.ru/files/new_work_styles/43_image.jpg?1729516870',
  },
  {
    id: 4,
    title: 'Борис Михайлов',
    description: 'опыт 2 года',
    src: 'https://cdn1.ozone.ru/s3/multimedia-1-k/6985619120.jpg',
  },
  {
    id: 5,
    title: 'Борис Клюев',
    description: 'опыт 5 лет',
    src: 'https://kursy-tatu.com/wp-content/uploads/2023/10/c9ByYl86tvk.jpg',
  },
  {
    id: 6,
    title: 'Борис Моисеев',
    description: 'без опыта',
    src: 'https://i.pinimg.com/236x/35/c9/e0/35c9e0bcc09e5015a17ba77d1df3ce7c.jpg',
  },
]
