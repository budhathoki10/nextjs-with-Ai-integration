"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useParams } from "next/navigation";



const PublicProfile = () => {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
const {username}= useParams()
  const fetchSuggestions = async () => {
    try {

      const res = await fetch("/api/suggestmessage", { method: "POST" });
      const data = await res.json();
      const splitSuggestions = data.output.split("||").map((s) => s.trim());
      setSuggestions(splitSuggestions);
    } catch {
      toast.error("Failed to load suggestions");
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    try {
    const response=   await axios.post("/api/sendMessage", {
        username:decodeURIComponent(username),
       content:message,
      });
      console.log(response)
      toast.success("Message sent!");
      setMessage("");
    } catch {

      toast.error("Failed to send message");
    }
  };
  

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">
        Send Anonymous Message to @   {decodeURIComponent(username)}
      </h1>

      {/* Message Input */}
      <Input
        placeholder="Write your anonymous message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleSend}>Send It</Button>

      {/* Suggestions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Suggest Messages</h2>
        <p className="text-sm mb-2">Click on any message below to select it.</p>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <Card
              key={i}
              className="p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => setMessage(s)}
            >
              {s}
            </Card>
          ))}
        </div>
      </div>

      {/* Manual refresh button */}
      <Button className="mt-4" variant="outline" onClick={fetchSuggestions}>
        Refresh Suggestions
      </Button>
    </div>
  );
};

export default PublicProfile;