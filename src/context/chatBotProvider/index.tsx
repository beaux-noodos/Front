import React, { createContext, useContext, useState } from 'react';
import { createAuthenticatedRequest } from "../../provider/api";
import {getCachedTSId, getCachedUser} from "../../utils/getCachedUser";

interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

interface ChatContextType {
    messages: Message[];
    sendMessage: (prompt: string) => Promise<void>;
    fetchTechnicalInformation: () => Promise<void>;
    currentScreen: 'information' | 'technicalInformation';
    switchScreen: (screen: 'information' | 'technicalInformation') => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentScreen, setCurrentScreen] = useState<'information' | 'technicalInformation'>('information');
    const { chatbotApi } = createAuthenticatedRequest();

    const user = getCachedUser();
    const TSId  = getCachedTSId();

    const sendMessage = async (prompt: string) => {
        const userMessage: Message = {
            sender: 'user',
            text: prompt,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            const id = user?.id || "";
            let response;

            if (currentScreen === 'information') {
                console.log("information")
                response = await chatbotApi.getChatbotInformation(id, prompt);
            } else if (currentScreen === 'technicalInformation') {
                console.log("technicalInformation")
                response = await chatbotApi.getChatbotTechnicalInformation(id, TSId, prompt);
            }

            const botResponse: Message = {
                sender: 'bot',
                text: response.data,
                timestamp: response.data[0].creation_datetime,
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error fetching information:", error);
            // Optionally, handle the error by adding an error message to the chat
        }
    };

    const fetchTechnicalInformation = async () => {
        try {
            const response = await chatbotApi.getChatbotTechnicalInformation();
            console.log('Technical Information:', response.data);
        } catch (error) {
            console.error("Error fetching technical information:", error);
        }
    };

    const switchScreen = (screen: 'information' | 'technicalInformation') => {
        setCurrentScreen(screen);
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage, fetchTechnicalInformation, currentScreen, switchScreen }}>
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
