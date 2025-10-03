"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { BookOpen, Send, Sparkles, TrendingUp, Undo2, Mic, MicOff } from "lucide-react";
import { format } from "date-fns";
import { arbitrum } from "viem/chains";
import axios from 'axios';

import type { Message } from "@/utils/classes/message";
import {
  EditMessage,
  PortfolioMessage,
  BuildPortfolioMessage,
  InvestMessage,
  TextMessage,
  ReviewPortfolioMessage,
  DepositMessage,
  FindStrategiesMessage,
  StrategiesCardsMessage,
} from "@/utils/classes/message";
import { useChat } from "@/contexts/ChatContext";
import {
  PortfolioBotWrapper,
  EditBotWrapper,
  ReviewPortfolioBotWrapper,
  BuildPortfolioBotWrapper,
  InvestmentFormBotWrapper,
  DepositBotWrapper,
  DefiStrategiesBotWrapper,
} from "@/components/BotWrapper";
import { BotResponse } from "@/utils/types";
import FindStrategiesBotWrapper from "@/components/BotWrapper/FindStrategiesBotWrapper";
import OnboardingGate from "@/components/OnboardingGate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JarvisBotIcon } from "@/components/JarvisBotIcon";
import lighthouse from '@lighthouse-web3/sdk';

export default function Home() {
  const [isInput, setIsInput] = useState(false);
  const [command, setCommand] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { closeChat, sendMessage } = useChat();
  const loadingBotResponse = sendMessage.isPending;

  useEffect(() => {
  if (!conversation) return;

  const upload = async () => {
    try {
      const privyToken = localStorage.getItem("privy:token") || "";
      console.log("Local storage user id: ", privyToken);

      const apiKey = "9b26a7bc.df292854af6d47d09222c014d4faa1b4"; 
      const lastMessage = conversation[conversation.length - 1];
      if(lastMessage.metadata){
      const messageText = JSON.stringify({
        id: lastMessage.metadata.id,
        text: lastMessage.metadata.text,
        sender: lastMessage.metadata.sender,
        timestamp: lastMessage.metadata.timestamp,
  
      });
    
     const output = await lighthouse.uploadText(messageText, apiKey, privyToken);

      console.log("Uploaded:", output);
    
    }
    
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  upload();
}, [conversation]);

  const parseBotResponse = (botResponse: BotResponse) => {
    let nextMessage: Message;

    console.log("Botresponse: "+botResponse)

    switch (botResponse.type) {
      case "build_portfolio":
        nextMessage = new InvestMessage({
          id: (Date.now() + 1).toString(),
          text: "Invest start",
          sender: "bot",
          timestamp: new Date(),
        });
        break;
      case "question":
        if (!botResponse.data.answer) {
          throw new Error("Invalid bot response data");
        }
        nextMessage = new TextMessage({
          id: (Date.now() + 1).toString(),
          text: botResponse.data.answer,
          sender: "bot",
          timestamp: new Date(),
        });
        break;
      case "strategies":
        const chains = botResponse.data.chain
          ? [botResponse.data.chain]
          : [arbitrum.id];
        const riskLevel = botResponse.data.risk_level || "low";

        nextMessage = new FindStrategiesMessage(
          {
            id: (Date.now() + 1).toString(),
            text: "Find strategies",
            sender: "bot",
            timestamp: new Date(),
          },
          riskLevel,
          chains
        );
        break;
      default:
        nextMessage = new TextMessage({
          id: (Date.now() + 1).toString(),
          text: botResponse.data.answer,
          sender: "bot",
          timestamp: new Date(),
        });
        break;
    }

    return nextMessage;
  };

  const addBotMessage = async (message: Message) => {
    await handleTypingText(message);
    setConversation((prev) => [...prev, message]);
  };

  const addUserMessage = (message: string) => {
    if (message === "") return;
    const userMessage: Message = new TextMessage({
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    });

    setConversation((prev) => [...prev, userMessage]);
    setCommand("");
  };

  /// HANDLE FUNCTIONS ///
  const handleHotTopic = (topic: string) => {
    setCommand(topic);
    // Focus the input field after setting the command
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleTypingText = async (botMessage: Message) => {
    setIsTyping(true);
    let currentText = "";
    const textToType = botMessage.metadata.text;

    for (let i = 0; i < textToType.length; i++) {
      currentText += textToType[i];
      setTypingText(currentText);
      // Slow down the typing speed
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    setIsTyping(false);
    setTypingText("");
  };
  // Handle key press in input field
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command.trim() !== "") {
      e.preventDefault();
      handleMessage(command);
    }
  };

  const renderBotMessageContent = (message: Message) => {
    if (message instanceof InvestMessage) {
      return (
        <InvestmentFormBotWrapper
          message={message}
          addBotMessage={addBotMessage}
        />
      );
    } else if (message instanceof PortfolioMessage) {
      return (
        <PortfolioBotWrapper message={message} addBotMessage={addBotMessage} />
      );
    } else if (message instanceof BuildPortfolioMessage) {
      return <BuildPortfolioBotWrapper message={message} />;
    } else if (message instanceof EditMessage) {
      return (
        <EditBotWrapper message={message} addBotMessage={addBotMessage} />
      );
    } else if (message instanceof ReviewPortfolioMessage) {
      return (
        <ReviewPortfolioBotWrapper
          message={message}
          addBotMessage={addBotMessage}
        />
      );
    } else if (message instanceof DepositMessage) {
      return (
        <DepositBotWrapper message={message} addBotMessage={addBotMessage} />
      );
    } else if (message instanceof FindStrategiesMessage) {
      return (
        <FindStrategiesBotWrapper
          message={message}
          addBotMessage={addBotMessage}
        />
      );
    } else if (message instanceof StrategiesCardsMessage) {
      return <DefiStrategiesBotWrapper message={message} />;
    }
  };

  const handleMessage = async (userInput: string) => {
    addUserMessage(userInput);

    try {
      const botResponse = await sendMessage.mutateAsync(userInput);
      const nextMessage = parseBotResponse(botResponse);

      await handleTypingText(nextMessage);
      setConversation((prev) => [...prev, nextMessage]);
    } catch (error) {
      console.error(error);
      setConversation((prev) => [
        ...prev,
        new TextMessage({
          id: (Date.now() + 1).toString(),
          text: "Request Completed. Let me know if anything else is required, thanks.",
          sender: "bot",
          timestamp: new Date(),
        }),
      ]);
    }
  };

  // Scroll to bottom of messages when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isTyping]);

  useEffect(() => {
    const latestBotMessages = conversation.filter(
      (message) => message.metadata.sender === "bot"
    );
    const latestBotMessage = latestBotMessages[latestBotMessages.length - 1];

    setIsInput(latestBotMessage instanceof TextMessage);
  }, [conversation]);

  useEffect(() => {
    closeChat();
  }, [closeChat]);

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser!');
      return;
    }

    setIsRecording(true);
    setIsListening(true);

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';
    let currentFullTranscript = '';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      currentFullTranscript = finalTranscript + interimTranscript;
      setCommand(currentFullTranscript);

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      silenceTimerRef.current = setTimeout(() => {
        stopVoiceRecording(currentFullTranscript);
      }, 4000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecording = (transcript?: string) => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    setIsRecording(false);
    setIsListening(false);

    const textToSend = transcript || command;


    if (textToSend.trim()) {
      console.log('Sending voice message:', textToSend.trim());
      setTimeout(async () => {
        handleMessage(textToSend.trim());

        // const body = {
        //   id: 13101820,
        //   resolvedStatus: false,
        //   requestedByUser: "User",
        //   actualQueryString: `${textToSend.trim()}`
        // };


        // await axios.post("http://127.0.0.1:8000/userQuery/processUserQuery", body, {
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // }).then((res) => {
        //   console.log(res.data)
        // }).catch((err) => {
        //   console.log(`There was Error Making Request:${err}`)
        // })
      }, 500);
    } else {
      console.log('No text to send');
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div
        className={`flex flex-col ${conversation.length > 0 ? "flex-1" : "h-full min-h-screen"
          }`}
      >
        {conversation.length === 0 ? (
          <>
            {/* Main Content - Centered Layout */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

              {/* Main Heading */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
                  What&apos;s on your mind?
                </h1>
              </div>

              {/* Main Input Area */}
              <div className="w-full max-w-2xl mb-8">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={`w-full h-14 px-6 pr-20 text-lg bg-white border border-black rounded-2xl shadow-sm focus:shadow-md transition-all duration-200 ${isRecording ? 'ring-2 ring-blue-500' : ''}`}
                    placeholder={isRecording ? "Listening..." : "Ask Jarvis"}
                  />
                  <div className="absolute right-2 top-2 flex gap-1">
                    <Button
                      onClick={startVoiceRecording}
                      disabled={isRecording}
                      className={`h-10 w-10 rounded-xl transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                      size="icon"
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleMessage(command);
                      }}
                      disabled={command.trim() === ""}
                      className="h-10 w-10 rounded-xl bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="w-full max-w-2xl space-y-4">
                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Button
                    variant="outline"
                    className="h-16 bg-white hover:bg-gray-50 border border-black rounded-xl flex items-center justify-start gap-4 px-6 shadow-sm"
                    onClick={() => handleMessage("Help me find the best DeFi strategies")}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Summary</div>
                      <div className="text-sm text-gray-500">Find DeFi strategies</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 bg-white hover:bg-gray-50 border border-black rounded-xl flex items-center justify-start gap-4 px-6 shadow-sm"
                    onClick={() => handleHotTopic("Learn more about DeFi")}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Learn Gently</div>
                      <div className="text-sm text-gray-500">DeFi education</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 bg-white hover:bg-gray-50 border border-black rounded-xl flex items-center justify-start gap-4 px-6 shadow-sm"
                    onClick={() => handleHotTopic("Give me an analysis on current crypto market")}
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Research</div>
                      <div className="text-sm text-gray-500">Market analysis</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 bg-white hover:bg-gray-50 border border-black rounded-xl flex items-center justify-start gap-4 px-6 shadow-sm"
                    onClick={() => handleMessage("Help me build a portfolio")}
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Get Inspired</div>
                      <div className="text-sm text-gray-500">Portfolio ideas</div>
                    </div>
                  </Button>
                </div>

                {/* Additional Options */}
                <div className="flex justify-center space-x-4 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleMessage("Think deeply about DeFi trends")}
                  >
                    🧠 Think Deeply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleHotTopic("Learn more about DeFi")}
                  >
                    🎓 Learn Gently
                  </Button>
                </div>
              </div>

              <OnboardingGate handleMessage={handleMessage} />
            </div>
          </>
        ) : (
          <>
            {/* Chat View - Clean Design */}
            <div className="flex-1 bg-white">
              {/* Header */}
              <div className="bg-white border-b border-gray-100 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">J</span>
                    </div> */}
                    <JarvisBotIcon className="mr-1 size-4" />
                    <h2 className="font-semibold text-gray-900">JarvisBot</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      setConversation([]);
                      window.scrollTo(0, 0);
                    }}
                    disabled={loadingBotResponse || isTyping}
                  >
                    <Undo2 className="w-4 h-4 mr-2" />
                    New Chat
                  </Button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6">
                  <div className="flex flex-col gap-6 pb-24">
                    {/* Welcome Message */}
                    <div className="flex justify-start">
                      <div className="max-w-[80%] bg-white border-2 border-black rounded-2xl px-6 py-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">J</span>
                          </div>
                          <span className="font-semibold text-gray-900">JarvisBot</span>
                        </div>
                        <div className="text-gray-700">
                          👋 Welcome to JarvisBot! I&apos;m a investment automation bot. Ask me anything about automating tasks or use our built-in functions.
                        </div>
                      </div>
                    </div>

                    {/* Conversation Messages */}
                    {conversation.map((message) => (
                      <div
                        key={message.metadata.id}
                        className={`flex ${message.metadata.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-6 py-4 border-2 border-black shadow-sm ${message.metadata.sender === "user"
                            ? "bg-gray-500 text-white"
                            : "bg-white text-gray-800"
                            }`}
                        >
                          {message.metadata.sender === "bot" && (
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">J</span>
                              </div>
                              <span className="font-semibold text-gray-900">JarvisBot</span>
                            </div>
                          )}

                          <div className="whitespace-pre-wrap break-words">
                            {message.metadata.text}
                          </div>

                          {/* Render bot message content by response type */}
                          {renderBotMessageContent(message)}

                          <div
                            className={`text-xs mt-3 ${message.metadata.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                              }`}
                          >
                            {format(message.metadata.timestamp, "HH:mm")}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Loading animation */}
                    {loadingBotResponse && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-white border-2 border-black rounded-2xl px-6 py-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">J</span>
                            </div>
                            <span className="font-semibold text-gray-900">JarvisBot</span>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Typewriter effect */}
                    {isTyping && typingText && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-white border-2 border-black rounded-2xl px-6 py-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">J</span>
                            </div>
                            <span className="font-semibold text-gray-900">JarvisBot</span>
                          </div>
                          <div className="whitespace-pre-wrap break-words text-gray-700">
                            {typingText}
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              {/* Input Area - Fixed at Bottom */}
              <div className="bg-white border-t border-gray-100 px-4 py-4">
                <div className="max-w-4xl mx-auto">
                  <div
                    className={`transition-opacity duration-200 `}
                  >
                    <div className="relative">
                      <Input
                        ref={inputRef}
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className={`w-full h-12 px-4 pr-20 bg-white border-2 border-black rounded-xl focus:shadow-md transition-all ${isRecording ? 'ring-2 ring-blue-500' : ''}`}
                        placeholder={isRecording ? "Listening..." : "Ask me anything about DeFi strategies..."}
                      />
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Button
                          onClick={startVoiceRecording}
                          disabled={isRecording}
                          className={`h-8 w-8 rounded-lg transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                          size="icon"
                        >
                          {isRecording ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleMessage(command);
                          }}
                          className="h-8 w-8 rounded-lg bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                          size="icon"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}