import type { Params } from 'app/api/contact/sendMail'
import { getDate, getTime } from './generateEmail'

export function generateReservationEmail({
  name,
  phone,
  from,
  message,
  to,
}: Params) {
  return `
  <html lang="ru">
    <head>
    <title>Email</title>
      <style>
        body {
          background: #007509;
          color: #ffffff;
          padding: 20px;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          background: linear-gradient(to top left, #1a6e00 80%, #4b634d 100%);
          padding: 10px;
          border-radius: 12px;
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          font-size: 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #6b806b;
          padding-bottom: 6px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          margin-bottom: 12px;
        }
        td {
          padding: 6px;
          border-bottom: 1px solid #395137;
          vertical-align: top;
        }
        .label {
          color: #9daf9c;
          width: 30%;
        }
        .value {
          font-weight: bold;
          font-size: 16px;
          white-space: pre-wrap;
        }
        .time {
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Бронь ${name} ${phone}</h2>
        <table>
          <tr><td class="label">Имя</td><td class="value">${name}</td></tr>
          <tr><td class="label">Телефон</td><td class="value">${phone}</td></tr>
          ${message ? `<tr><td class="label">Сообщение</td><td class="value">${message}</td></tr>` : ''}
          <tr><td class="label">Дата</td><td class="value">${getDate(from)}</td></tr>
          <tr><td class="label">C</td><td class="value">${getTime(from)}</td></tr>
          <tr><td class="label">До</td><td class="value">${getTime(to)}</td></tr>
        </table>
        <div class="time">${getDate()}</div>
      </div>
    </div>
    </body>
  </html>
  `
}
