"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDebounceCallback } from "usehooks-ts"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SignupSchema } from "../../../Schema/signupSchema"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SignUP = () => {
  const [userNameMessage, setUserNameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

const form = useForm({
  resolver: zodResolver(SignupSchema),
  defaultValues: { username: "", email: "", password: "" },
  mode: "onChange",
})

  const debounced = useDebounceCallback(async (value) => {
    if (!value) return
    setIsCheckingUsername(true)
    setUserNameMessage("")
    try {
      const response = await axios.get(
        `/api/checkuserNameUnique?username=${encodeURIComponent(value)}`
      )
      console.log(response)
      setUserNameMessage(response.data.message)
    } catch (error) {
      console.log(error)
    } finally {
      setIsCheckingUsername(false)
    }
  }, 300)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/signup", data)
      toast.success(response.data.message)
      router.replace(`/verify/${data.username}`)
      form.reset()
    } catch (error) {
      if (error.response?.data?.error) {
        form.setError("username", {
          type: "server",
          message: error.response.data.error.message,
        })
      }
      toast.error("Signup failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <html>
      <body>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Signup to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      autoComplete="off"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                  </FormControl>

                  {/* Zod validation error */}
                  <FormMessage className="text-red-500 text-sm" />

                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {userNameMessage && (
                    <p
                      className={`text-sm ${
                        userNameMessage === "user name is available"
                          ? "text-green-500": "text-red-500"
                      }`}
                    >
                      {userNameMessage}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
      </body>
    </html>
  )
}

export default SignUP