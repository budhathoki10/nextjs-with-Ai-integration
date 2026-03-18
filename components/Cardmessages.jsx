import React from 'react'
import axios from 'axios'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@react-email/components'
import { toast } from "sonner"
const Cardmessages = ({message,onmessageDelete}) => {
  const handledelete=async ()=>{
const  response= await axios.delete(`/api/deleteMessage/${message._id}`)
if(!response.success){
toast.error(response.data.message)

}
toast.success(response.data.message)
onmessageDelete(message._id)
  }
  return (
<>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className='w-5 h-10'>X</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handledelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</>
  )
}

export default Cardmessages