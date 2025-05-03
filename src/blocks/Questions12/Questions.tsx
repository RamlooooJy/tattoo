import { Button } from 'components/ui/button'

const Questions = () => {
  return (
    <div className={'p-4'}>
      <div>
        <h2 className={'text-2xl'}>Остались вопросы?</h2>
        <p>
          Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на
          все вопросы
        </p>
      </div>
      <form action="">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <Button>Задать вопрос</Button>
      </form>
    </div>
  )
}

export default Questions
