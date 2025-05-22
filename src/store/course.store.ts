import axios, { type AxiosResponse } from 'axios'
import type { Course } from 'types'
import { getPath } from 'lib/utils'

export const coursesPathName = getPath('/api/courses')

export async function fetchCourses() {
  let result: Course[] = []

  try {
    const res: AxiosResponse<Course[]> = await axios.get(coursesPathName)

    result = res.data
  } catch (error) {
    console.log(error)
  }
  return result ?? []
}
