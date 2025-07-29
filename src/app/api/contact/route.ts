import { type NextRequest, NextResponse } from 'next/server'
import { sendMail } from 'app/api/contact/sendMail'

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const data = await req.json()

    try {
      await sendMail(
        { ...data, url: req.headers.get('origin') },
        { type: 'new_user' },
      )
      return NextResponse.json(
        {
          success: true,
          message: 'Письмо отправлено успешно',
        },
        { status: 200 },
      )
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Ошибка при отправке письма\n\n${JSON.stringify(error)}`,
        },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: 'There was an error with your request.',
      },
      { status: 405 },
    )
  }
}
