import axios, { type AxiosResponse } from 'axios'
import type { Course } from 'types'
import { getDefaultOrigin } from 'lib/utils'

export const coursesPathName = `${getDefaultOrigin()}/api/courses`

export async function fetchCourses() {
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

  if (isBuild) {
    return []
  }
  const courses: AxiosResponse<Course[]> = await axios.get(coursesPathName)

  return courses.data
}
