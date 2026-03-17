"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { verifySchema } from "../../../../Schema/verifySchema"

import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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


const VerifyAccountViaOTP = () => {
  const [chckingState, setchckingState]= useState(false);

  const router = useRouter()
  const params = useParams()

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  })



  // here data gives the code    code: "",

  const onSubmit = async (data) => {
    try {
       console.log("data is",data)
      setchckingState(true)
      const response = await axios.post("/api/verifyCode", {
        username: params.username,
        code: data.code,
      })
      console.log("response is",response)
      toast.success(response.data.message)
      router.replace("/sign-in")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed")
    }
    finally{
            setchckingState(false)
    }
  }

  return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <Card className="w-full sm:max-w-md">
  <CardHeader>
    <CardTitle>Verify Account</CardTitle>
    <CardDescription>
      Enter the OTP code sent to your email/phone.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your OTP" autoComplete="one-time-code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">
            {chckingState? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </form>
    </Form>
  </CardContent>
</Card>
    </div>
    </div>
  )
}

export default VerifyAccountViaOTP