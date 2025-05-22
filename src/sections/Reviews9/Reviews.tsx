import Carousel from 'components/Carousel'
import img from '../../assets/card-skin.png'
import { cn, getBackgroundImage, navigation } from 'lib/utils'

const { style, backgroundImageClassName } = getBackgroundImage(img.src)

const Reviews = () => {
  return (
    <section id={navigation.reviews} className={'bg-accent'}>
      <div className={'container-max-width'}>
        <Carousel useAutoplay={false}>
          {reviews.map((review) => (
            <div
              style={style}
              className={cn(
                backgroundImageClassName,
                'reviewCard cursor-grab select-none',
                'text-card-foreground background-container aspect-[16/24] w-[300px]',
              )}
              key={review.description}
            >
              <h3
                className={
                  'reviewCardHeader font-semibold text-secondary-foreground'
                }
              >
                {review.title}
              </h3>
              <div className={'reviewCardBody p-2'}>
                <p className={'text-sm font-semibold'}>{review.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

const reviews = [
  {
    title: 'Карина',
    description:
      'Отучилась, довольна безумно огромное спасибо Светлане и Анастасии. Как только проходишь в студию то сразу видно как тебя встречают классные люди, любящие и добрые, салон мне стал вторым домом',
  },
  {
    title: 'Мария',
    description:
      'Хаю хай всем! Хочу выразить огромную благодарность всем тем прекрасным людям, благодарякоторым я научилась бить тату! Ни один мастер не оставлял меня и помогал на всем моем маленьком пути! Вы в моем сердечке навсегда!',
  },
  {
    title: 'Светлана',
    description:
      'Всем привет! Прошла курс обучения в студии тату Taurus. Атмосфера очень хорошая, все работают и каждый готов помочь, преподаватели все толково обьясняют и показывают, администраторы подсказывают, работа в команде и на хороший результат, приходите не пожалеете * 100',
  },
  {
    title: 'Оксана',
    description:
      'Прошла обучение на тату-мастера в салоне Taurus, очень понравилось, нереальная атмосфера и шикарная команда Помогали, советовали, поддержив али на протяжении всего обучения. Спасибо большое Желаю вам успехов и продвижения',
  },
]

export default Reviews
