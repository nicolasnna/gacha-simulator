export class User {
  userId: string
  email: string
  password: string
  role!: string
  superAdmin: boolean
  active: boolean
  name?: string
}
