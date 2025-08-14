export interface LoginUserApi {
  email: string
  password: string
}
export interface RegisterUserApi extends LoginUserApi {
  name?: string
}

export interface ResponseAuthApi {
  email?: string
  role: string
  access_token: string
}
