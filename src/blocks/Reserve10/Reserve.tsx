import { Button } from 'components/ui/button'
import { navigation } from 'lib/utils'
import { ContactFormTrigger } from 'components/ContactForm/ContactFormModal'
import { SlideY } from 'components/Animations/SlideY'

const Reserve = () => {
  return (
    <section
      id={navigation.reserve}
      className={'screenHeight grid content-center justify-center'}
    >
      <SlideY className={'grid p-4 gap-4 sticky top-2/5'}>
        <h2 className={'text-3xl font-semibold'}>ЗАПИСАТЬСЯ НА КУРС — ЛЕГКО</h2>
        <p>
          Просто заполните форму, выбери подходящий курс, и нажми кнопку
          «Отправить заявку» <br />
          Мы свяжемся в ближайшее время!
        </p>
        <ContactFormTrigger>
          <Button>Записаться</Button>
        </ContactFormTrigger>
      </SlideY>
    </section>
  )
}

export default Reserve
