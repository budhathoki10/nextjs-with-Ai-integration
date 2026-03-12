import { verify } from 'crypto';
import {z} from 'zod';
export const acceptMessageSchema= z.object({
content:z.string().min(10,{message:"Content must be atleast of 10 chars"})
.max(500,{message:"Content must be no more than 500 chars"})




})