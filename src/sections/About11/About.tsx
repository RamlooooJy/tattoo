import img from 'assets/about.jpeg'
import { navigation } from 'lib/utils'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'
import Image from 'next/image'

const About = () => {
  return (
    <section id={navigation.about}>
      <div className={'container-max-width'}>
        <AnimationSlideY className={'grid gap-4'}>
          <h2 className={'text-3xl font-semibold py-12 px-4'}>
            Немного об авторе
          </h2>
          <div className={'aspect-video w-full max-h-96 relative'}>
            <Image className={'object-cover'} src={img.src} alt="" fill />
          </div>
        </AnimationSlideY>
        <div
          className={
            'py-4 pl-10 pr-20 grid gap-8 bg-accent text-accent-foreground'
          }
        >
          <AnimationSlideY>
            <p>
              Меня зовут Григорий. Я тату мастер и основатель собственной
              студии, работающий в гравюрном и графическом стиле с 2007 года. В
              моей студии вы можете получить все необходимые знания по
              художественной татуировке, чтобы самостоятельно начать работу,
              избежав многих ошибок и подводных камней.
            </p>
          </AnimationSlideY>
          <AnimationSlideY>
            <p>
              Обучение проводим на профессиональном оборудовании, чтобы
              максимально человек привык к качественной технике. С каждым
              учеником я провожу индивидуальные занятия, чтобы дать возможность
              человеку максимально раскрыть свой потенциал, и это важный момент,
              ведь у каждого свой индивидуальный стиль рисунка.
            </p>
          </AnimationSlideY>
          <AnimationSlideY>
            <p>
              По завершению курса вы будете допущены до работы с клиентом, под
              руководством мастера. Также мы поможем вам приобрести качественное
              и профессиональное оборудование.
            </p>
          </AnimationSlideY>
        </div>
      </div>
    </section>
  )
}

export default About
