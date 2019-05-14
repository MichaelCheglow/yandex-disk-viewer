import axios from 'axios'
import qs from 'qs'

const BASE_URL = 'https://cloud-api.yandex.net:443/v1/disk/resources'

export function  getData (path, token) {
  const encodedPath = qs.stringify({ path })
  const url = `${BASE_URL}?${encodedPath}`

  return axios.get(url, { headers: { Authorization: token } }).then(response => Promise.resolve(response.data))
}
