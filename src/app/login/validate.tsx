import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required.")
    .trim(),
  password: z
    .string()
    .nonempty("Password is required.")
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined