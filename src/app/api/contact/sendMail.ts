import nodemailer, { type SendMailOptions } from 'nodemailer'
import { generateContactEmailHTML } from 'app/api/contact/generateEmail'
import { match } from 'ts-pattern'
import { generateReservationEmail } from 'app/api/contact/generateReservationEmail'

export type EmailType = 'new_reservation' | 'new_user'

export type Params = {
  url: string
  name: string
  phone: string
  email?: string
  course?: string
  question?: string
  from?: Date
  to?: Date
  message?: string
}
// todo make good mailer

export const sendMail = async (data: Params, options: { type: EmailType }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const { title, fn } = match(options.type)
    .with('new_reservation', () => ({
      title: `Бронь ${data.name}`,
      fn: generateReservationEmail,
    }))
    .otherwise(() => ({
      title: `Новое сообщение от ${data.phone} c сайта ${data.url}`,
      fn: generateContactEmailHTML,
    }))

  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: title,
    html: fn(data),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(`Письмо отправлено: ${info.response}`)
  } catch (error) {
    console.error('Ошибка при отправке письма:', error)
  }
}
