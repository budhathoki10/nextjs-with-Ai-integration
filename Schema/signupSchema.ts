import { z } from "zod"
import { validateUsername } from "./validateUsername"

export const SignupSchema = z.object({
  username: validateUsername,
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 chars"),
})