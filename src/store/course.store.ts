import axios, { type AxiosResponse } from 'axios'
import type { Course } from 'types'
import { getDefaultOrigin } from 'lib/utils'

export const coursesPathName = `${getDefaultOrigin()}/api/courses`

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
