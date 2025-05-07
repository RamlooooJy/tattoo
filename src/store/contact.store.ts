import axios, { type AxiosResponse } from 'axios'
import { getDefaultOrigin } from 'lib/utils'

const pathName = `${getDefaultOrigin()}/api/contact`

async function fetchCourses(
  data: Record<string, string | number | undefined | boolean>,
) {
  try {
    return await axios
      .post(pathName, data)
      .then((response: AxiosResponse) => response.data)
  } catch (error) {
    console.error('Ошибка при отправке:', error)
  }
}

export default fetchCourses
