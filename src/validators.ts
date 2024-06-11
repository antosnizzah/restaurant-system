
import { z } from 'zod'

export const userSchema = z.object({
   
        "name": z.string(),
        "contact_phone": z.number(),
        "phone_verified": z.boolean(),
        "email": z.string(),
        "email_verified": z.boolean(),
        "confirmation_code": z.string(),
        "password": z.string()
      })
 export const authorizeUsersSchema = z.object({
  "username": z.string(),
  "password": z.string(),
  "user_id": z.number()
})
export const updateauthorizeUsersSchema = z.object({
  "id":z.number(),
  "username": z.string(),
  "password": z.string(),
  "user_id": z.number().optional()
})
