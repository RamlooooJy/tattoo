import type { Course } from 'types/types'
import { cache } from './cache'

export async function GET() {
  try {
    return Response.json(cache.courses, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // <- разрешает запросы с любых источников
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const newCourse: Course = {
    id: cache.courses.length + 1,
    title: body.title || 'Untitled Course',
    price: body.price || 'Free',
    description: body.description || '',
    backgroundStyle: body.backgroundStyle || 'bg-white',
    textStyle: body.textStyle || 'text-black',
    points: Array.isArray(body.points) ? body.points : [],
  }

  cache.courses.push(newCourse)

  return Response.json(newCourse, { status: 201 })
}
