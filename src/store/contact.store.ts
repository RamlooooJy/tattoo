import { getPath } from 'lib/utils'
import axios, { type AxiosResponse } from 'axios'

const pathName = getPath('/api/contact')

async function fetchContactApi(
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

export default fetchContactApi
