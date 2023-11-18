import type { AxiosError, AxiosResponse } from 'axios'
import axios, { Axios } from 'axios'

class Api {
  private axiosInstance: Axios
  private url: string
  private method: string
  private payload: object | null

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4000/api',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    this.url = ''
    this.method = 'get'
    this.payload = null
  }

  get(url: string) {
    return this.setUrl(url).setMethod('get').execute()
  }

  post(url: string, payload: object = {}) {
    this.setUrl(url).setMethod('post')
    if (Object.keys(payload).length > 0) {
      this.setPayload(payload)
    }
    return this.execute()
  }

  put(url: string, payload: object = {}) {
    this.setUrl(url).setMethod('put')
    if (Object.keys(payload).length > 0) {
      this.setPayload(payload)
    }
    return this.execute()
  }

  delete(url: string) {
    return this.setUrl(url).setMethod('delete').execute()
  }

  withHeaders(headers: object) {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...headers
    }
    return this
  }

  withHeader(name: string, value: string) {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      [name]: value
    }
    return this
  }

  withToken(token: string, bearer: boolean = false) {
    const authorization = bearer ? `Bearer ${token}` : token
    return this.withHeader('Authorization', authorization)
  }

  private setUrl(url: string) {
    this.url = url
    return this
  }

  private setMethod(method: string) {
    this.method = method
    return this
  }

  private setPayload(payload: object | null) {
    this.payload = payload
    return this
  }

  private async execute() {
    try {
      let response: AxiosResponse

      switch (this.method) {
        case 'get':
          response = await this.axiosInstance.get(this.url)
          break
        case 'post':
          response =
            this.payload !== null
              ? await this.axiosInstance.post(this.url, this.payload)
              : await this.axiosInstance.post(this.url)
          break
        case 'put':
          response =
            this.payload !== null
              ? await this.axiosInstance.put(this.url, this.payload)
              : await this.axiosInstance.put(this.url)
          break
        case 'delete':
          response = await this.axiosInstance.delete(this.url)
          break
        default:
          throw new Error(`Invalid method: ${this.method}`)
      }

      return response.data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(String(error.response?.data) || error.message)
    }
  }
}

export default new Api()
