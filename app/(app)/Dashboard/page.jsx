"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { acceptMessageSchema } from "../../../Schema/acceptMessageSchema";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/ui/MessageCard";

const Page = () => {
  const [messages, setMessages] = useState([]);   // ✅ always an array
  const [loading, setLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, setValue } = form;
  const acceptingMessage = watch("acceptingMessage");

  // ✅ Fetch accept-message status
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/AcceptMessage");
      console.log("accept message response", response.data);
      setValue("acceptingMessage", response.data.isexceptingMessage);
    } catch {
      toast.error("Failed to fetch message acceptance status");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // ✅ Fetch messages
  const fetchMessages = useCallback(async (refresh = false) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getMessage");
      console.log("get message response", response.data);
      setMessages(response.data.message || []); // ✅ safe fallback
      if (refresh) {
        toast("Refresh", { description: "Showing latest messages" });
      }
    } catch {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/AcceptMessage", {
        acceptingMessage: !acceptingMessage,
      });
      console.log("response is", response.data);
      setValue("acceptingMessage", !acceptingMessage);
      toast.success(response.data.message);
    } catch {
      toast.error(response.data.message);
    }
  };

  const handleDeleteMessage = (messageID) => {
    setMessages(messages.filter((e) => e._id !== messageID));
    // optionally call DELETE API here
  };

  const username = session?.user?.username;
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && username) {
      const baseURL = `${window.location.protocol}//${window.location.host}`;
      setProfileUrl(`${baseURL}/u/${username}`);
    }
  }, [username]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard.");
  };

  if (!session?.user) {
    return <div>Please login</div>;
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      {/* Copy Link Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      {/* Accept Messages Switch */}
      <div className="mb-4 flex items-center">
        <Switch
          checked={acceptingMessage}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptingMessage ? "On" : "Off"}
        </span>
      </div>

      <Separator />

      {/* Refresh Button */}
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      {/* Messages List */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(messages) || messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Page;