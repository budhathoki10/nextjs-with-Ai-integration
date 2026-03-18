"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner"
import {acceptMessageSchema} from "../../../Schema/acceptMessageSchema"

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageID) => {
    setMessages(messages.filter((e) => e._id !== messageID));

  };

  // const {data}= useSession();
  const form= useForm({
    resolver:zodResolver(acceptMessageSchema)
  })
  // console.log("form is",form)

  const {register,watch,setValue}=form;
  const acceptMessages= watch('acceptMessages')

  const fetchAcceptMessage= useCallback(async()=>{
    setIsSwitchLoading(true)
    try {
      const response= await axios.get('/api/AcceptMessage')
      setValue('acceptMessages',response.data.isexceptingMessage)
    } catch (error) {
       if (error.response.status === 400 ||error.response.status === 400 ) {
         toast.error("failed to fetch");
       }
    }
    finally{
    setIsSwitchLoading(false)

    }

  },[setValue]);

  const fetchmessage= useCallback(async(refresh=false)=>{
setLoading(true)
setIsSwitchLoading(false)
  })

  return (
    <>
     
    </>
  );
};

export default Page;