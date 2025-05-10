import { navigation } from 'lib/utils'
import { ContactQuestionForm } from 'components/ContactForm'
import { SlideY } from 'components/Animations/SlideY'

const Questions = () => {
  return (
    <section id={navigation.questions} className={'grid gap-6 p-4 relative'}>
      <SlideY>
        <h2 className={'text-2xl'}>Остались вопросы?</h2>
        <p>
          Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
          все вопросы
        </p>
      </SlideY>
      <SlideY>
        <ContactQuestionForm />
      </SlideY>
    </section>
  )
}

export default Questions
