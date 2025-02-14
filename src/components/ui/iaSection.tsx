"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./iaInput";
import { Button } from "@/components/ui/iaButton";
import { Send } from "lucide-react";
import Image from "next/image"

interface Message {
    sender: "user" | "ia";
    text: string;
}

export default function ChatIA() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "ia", text: "Bonjour ! Posez-moi une question sur ce livre 📖." }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: "user", text: input };
        const aiMessage: Message = {
            sender: "ia",
            text: "Bonne question ! Voici une réponse basée sur le contenu du livre... 🤖"
        };

        setMessages([...messages, userMessage, aiMessage]);
        setInput("");
    };

    return (
        <div>
            <h1 className="my-4 text-xl font-semibold">Apprendre plus avec notre assistante virtuelle</h1>
            {/* Zone des messages */}
            <div className="h-80 overflow-y-auto p-3 space-y-4 rounded-lg">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-[75%] ${msg.sender === "user" && "bg-gray-200 text-black ml-auto"}`}
                    >
                        {msg.sender != "user" && (<div className="text-sm text-gray-500 flex items-center mb-2">
                            <Image src={"/images/ucb_logo.jpg"} alt={"ucb logo"} className="rounded-full mr-2" width={20} height={20} />
                            <span>UCBukavu assistante virtuelle</span>
                        </div>)}
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Zone d'entrée */}
            <div className="border border-gray-300 bg-gray-200 rounded-lg">
                <Input
                    className="flex-1 bg-gray-200"
                    placeholder="Écrivez un message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <div className="flex justify-end p-2">
                <Send size={18} className="text-black font-semibold" onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
}
