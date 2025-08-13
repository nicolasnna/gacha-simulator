export interface RegisterUserApi {
  email: string
  password: string
  name?: string
}

export interface ResponseRegisterUserApi {
  email: string
  role: string
  access_token: string
}
