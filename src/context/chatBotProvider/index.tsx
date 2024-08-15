import React, {createContext, useContext, useState} from 'react';
import {createAuthenticatedRequest} from "../../provider/api";
import {getCachedUser} from "../../utils/getCachedUser";

interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

interface ChatContextType {
    messages: Message[];
    sendMessage: (prompt: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const {chatbotApi} = createAuthenticatedRequest();

    const user = getCachedUser();

    const sendMessage = async (prompt: string) => {
        // Add the user's message to the chat
        const userMessage: Message = {
            sender: user?.last_name || 'User',
            text: prompt,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            const id = user?.id || "";
            const response = await chatbotApi.getChatbotInformation(id, prompt);

            const botResponse: Message = {
                sender: 'bot',
                text: response.data,
                timestamp: response.data[0].creation_datetime,
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error fetching chatbot information:", error);
            // Optionally, handle the error by adding an error message to the chat
        }
    };

    return (
        <ChatContext.Provider value={{messages, sendMessage}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};