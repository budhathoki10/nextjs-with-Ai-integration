"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

function FormField(props: React.ComponentProps<typeof Controller>) {
  return <Controller {...props} />
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium", className)} {...props} />
}

function FormControl(props: React.ComponentProps<typeof Slot>) {
  return <Slot {...props} />
}

function FormMessage({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-red-500", className)} {...props}>
      {children}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }