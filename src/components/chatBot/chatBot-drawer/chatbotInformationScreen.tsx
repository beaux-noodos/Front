// ChatbotInformationScreen.tsx
import React from 'react';
import { List, Typography } from 'antd';
import { Message } from '../../../context/chatBotProvider';

const { Text } = Typography;

interface ChatbotInformationScreenProps {
    messages: Message[];
}

export const ChatbotInformationScreen: React.FC<ChatbotInformationScreenProps> = ({ messages }) => {
    return (
        <List
            dataSource={messages}
            renderItem={(item) => (
                <List.Item
                    style={{
                        display: "flex",
                        justifyContent: item?.sender === "bot" ? "flex-start" : "flex-end",
                        alignItems: "end",
                        marginBottom: "10px",
                    }}
                >
                    {item?.sender === "bot" && (
                        <div
                            style={{
                                maxWidth: "70%",
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: "#F0F0F0",
                                textAlign: "left",
                            }}
                        >
                            <Text>{item.text}</Text>
                        </div>
                    )}
                </List.Item>
            )}
        />
    );
};