"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { Message, BotResponse } from "@/utils/types";

interface ChatContextType {
  showChat: boolean;
  openChat: (firstMessage?: string | Message) => void;
  closeChat: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isMinimized: boolean;
  toggleMinimize: () => void;
  sendMessage: UseMutationResult<BotResponse, Error, string>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);


  const sendMessage = useMutation({
    mutationFn: async (message: string): Promise<BotResponse> => {
      console.log("CHATBOT MESSAGE", message);

      const request_body = {
        id: 13101820,
        resolvedStatus: false,
        requestedByUser: "User",
        actualQueryString: message
      }

      if (message.toLowerCase().includes("strat")) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CHATBOT_URL}/defiInfo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ input_text: message }),
          }
        );
        console.log(res.json())
        return res.json();

      } else {
        const res = await fetch(
          `http://127.0.0.1:8000/userQuery/processUserQuery`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(request_body),
          })
          console.log(res.json())
          return res.json();
      }



    },
  });

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const openChat = (firstMessage?: string | Message) => {
    setShowChat(true);
    setIsMinimized(false);

    if (firstMessage) {
      const msgObj: Message =
        typeof firstMessage === "string"
          ? {
            id: Date.now().toString(),
            text: firstMessage,
            sender: "bot",
            timestamp: new Date(),
            type: "Text",
          }
          : firstMessage;
      setMessages([msgObj]);
    }
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <ChatContext.Provider
      value={{
        showChat,
        openChat,
        closeChat,
        messages,
        setMessages,
        isMinimized,
        toggleMinimize,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
