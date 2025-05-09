export type Course = {
  id: number
  title: string
  price: string
  description: string
  backgroundStyle: string
  textStyle: string
  points: Array<{
    title: string
    text: string
  }>
}

export type Courses = {
  courses: Course[]
}
