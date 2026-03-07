import {object, string, email} from "zod"

export const signInSchema = object({
    username: string().min(3, 'username or email is required'),
    password: string().min(4, 'password is required')
})

export const signUpSchema = object({
    username: string().min(3, 'username is required'),
    password: string().min(4, 'password is required!'),
    email: email('provide a valid email')
})