import { navigation } from 'lib/utils'
import { ContactQuestionForm } from 'components/ContactForm'
import { AnimationSlideY } from 'components/Animations/AnimationSlideY'

const Questions = () => {
  return navigation.questions ? (
    <section id={navigation.questions} className={'relative'}>
      <div className={'container-max-width grid gap-6 p-4 '}>
        <AnimationSlideY>
          <h2 className={'text-2xl font-semibold'}>Остались вопросы?</h2>
          <p>
            Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
            все вопросы
          </p>
        </AnimationSlideY>
        <ContactQuestionForm />
      </div>
    </section>
  ) : null
}

export default Questions
