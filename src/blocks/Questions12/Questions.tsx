import { navigation } from 'lib/utils'
import { ContactQuestionForm } from 'components/ContactForm'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

const Questions = () => {
  return (
    <section id={navigation.questions} className={'grid gap-6 p-4 relative'}>
      <AnimationSlideY>
        <h2 className={'text-2xl font-semibold'}>Остались вопросы?</h2>
        <p>
          Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
          все вопросы
        </p>
      </AnimationSlideY>
      <ContactQuestionForm />
    </section>
  )
}

export default Questions
