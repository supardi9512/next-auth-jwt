import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
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