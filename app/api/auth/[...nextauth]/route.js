import NextAuth from "next-auth";
import { authOptions } from "./option";

const handler = NextAuth(authOptions);
export default handler;