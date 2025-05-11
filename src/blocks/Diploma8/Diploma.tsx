import { cn, navigation } from 'lib/utils'
import background from '../../assets/sheet.png'
import diploma1 from '../../assets/diplom1.png'
import diploma2 from '../../assets/diplom2.png'
import diploma3 from '../../assets/diplom3.png'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

const Diploma = () => {
  return (
    <section
      id={navigation.diploma}
      style={
        {
          '--local-background': `url(${background.src})`,
        } as React.CSSProperties
      }
      className={cn('p-4', 'grid background-container screenHeight')}
    >
      <div>
        <AnimationSlideY>
          <h2
            className={'text-4xl font-semibold text-primary-foreground py-12'}
          >
            Дипломы <br />– обязательно
          </h2>
        </AnimationSlideY>
        <div className="diplomas p-8 h-[250px] relative left-[var(--container-padding-sm)]">
          {diplomas.map((img) => (
            <img
              className={cn('h-full absolute', img.rotateClass)}
              key={img.id}
              src={img.src}
              alt=""
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const diplomas = [
  {
    id: 1,
    src: diploma1.src,
    rotateClass: 'rotate-[-20deg]',
  },
  {
    id: 2,
    src: diploma2.src,
    rotateClass: 'rotate-[20deg]',
  },
  {
    id: 3,
    src: diploma3.src,
    rotateClass: 'rotate-[40deg]',
  },
]

export default Diploma
