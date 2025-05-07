import type { FormType } from 'lib/utils'
import nodemailer, { type SendMailOptions } from 'nodemailer'
import { generateContactEmailHTML } from 'app/api/contact/generateEmail'

export const sendMail = async (data: FormType & { url: string }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Новое сообщение от ${data.phone} c сайта ${data.url}`,
    html: generateContactEmailHTML(data),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(`Письмо отправлено: ${info.response}`)
  } catch (error) {
    console.error('Ошибка при отправке письма:', error)
  }
}
