import { z } from "zod"

export const validateUsername = z
  .string()
  .min(2, "user name must have at least 2 characters")
  .max(20, "user name must not be more than 20 chars")
  // .regex(/[^a-zA-Z0-9]/, "user name must not contain special chars")