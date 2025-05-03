import { Button } from 'components/ui/button'

const Reserve = () => {
  return (
    <div className={'screenHeight grid content-center justify-center'}>
      <div className={'grid p-4 gap-4'}>
        <h2 className={'text-3xl'}>ЗАПИСАТЬСЯ НА КУРС — ЛЕГКО</h2>
        <p>
          Просто заполните форму, выбери подходящий курс, и нажми кнопку
          «Отправить заявку» <br />
          Мы свяжемся в ближайшее время!
        </p>
        <Button>Записаться</Button>
      </div>
    </div>
  )
}

export default Reserve
