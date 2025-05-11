export function generateContactEmailHTML({
  name,
  phone,
  email,
  course,
  question,
  url,
}: {
  url: string
  name: string
  phone: string
  email?: string
  course?: string
  question?: string
}) {
  return `
  <html lang="ru">
    <head>
    <title>Email</title>
      <style>
        body {
          background: #111827;
          color: #ffffff;
          padding: 20px;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          background: linear-gradient(to top left, #1f2937 80%, #4b5563 100%);
          padding: 10px;
          border-radius: 12px;
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          font-size: 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #6b7280;
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
          border-bottom: 1px solid #374151;
          vertical-align: top;
        }
        .label {
          color: #9ca3af;
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
        <h2>Новое сообщение от ${url}</h2>
        <table>
          <tr><td class="label">Имя</td><td class="value">${name}</td></tr>
          <tr><td class="label">Телефон</td><td class="value">${phone}</td></tr>
          ${course ? `<tr><td class="label">Курс</td><td class="value">${course}</td></tr>` : ''}
          ${email ? `<tr><td class="label">Email</td><td class="value">${email}</td></tr>` : ''}
          ${question ? `<tr><td class="label">Сообщение</td><td class="value">${question}</td></tr>` : ''}
        </table>
        <div class="time">${getDate()}</div>
      </div>
    </div>
    </body>
  </html>
  `
}

const getDate = () => {
  return new Date().toLocaleDateString('ru-RU', {
    weekday: 'long', // "понедельник"
    year: 'numeric', // "2025"
    month: 'long', // "май"
    day: 'numeric', // "7"
  })
}
