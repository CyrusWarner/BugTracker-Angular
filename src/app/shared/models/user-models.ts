
export interface UserRegister {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface RegisteredUser {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  dateJoined: string

}

export interface UserToken {
  token: string,
  expiration: number
}

export interface User {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  emailConfirmed: boolean,
  dateJoined: string

}
