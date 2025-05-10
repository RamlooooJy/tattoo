import { cn, navigation } from 'lib/utils'
import background from '../../assets/sheet.png'
import diploma1 from '../../assets/diplom1.png'
import diploma2 from '../../assets/diplom2.png'
import diploma3 from '../../assets/diplom3.png'
import { SlideY } from 'components/Animations/SlideY'

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
        <SlideY className={'text-4xl text-primary-foreground py-12'}>
          <h2>
            Дипломы <br />– обязательно
          </h2>
        </SlideY>
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
