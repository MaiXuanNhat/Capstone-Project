import axios from 'axios'
import { parse, stringify } from 'qs'

export const BASE_API_URL = 'http://172.20.10.3:8000/'

const axiosClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
    },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
})

export default axiosClient