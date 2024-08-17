import React, { useState } from 'react';
import { Drawer, List, Avatar, Typography, Divider, Space, Input, Button, theme } from 'antd';
import { RobotOutlined, SendOutlined, StarOutlined, SwitcherOutlined } from '@ant-design/icons';
import { useChat } from '../../../context/chatBotProvider';
import { SuggestionCard } from '../suggestionCard';
import { getCachedTSId } from "../../../utils/getCachedUser";

const { TextArea } = Input;
const { Text } = Typography;

interface ChatDrawerProps {
    visible: boolean;
    onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ visible, onClose }) => {
    const { messages, sendMessage, fetchTechnicalInformation, currentScreen, switchScreen } = useChat();
    const [inputValue, setInputValue] = useState("");

    const { token: color } = theme.useToken();

    const TSId = getCachedTSId();

    const handleSend = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue.trim());
            setInputValue("");
        }
    };

    const handleSelectSuggestion = (title: string) => {
        setInputValue(title);
    };

    const handlePremiumButtonClick = () => {
        if (TSId) {
            fetchTechnicalInformation();
        }
    };

    const handleSwitchScreen = () => {
        switchScreen(currentScreen === 'information' ? 'technicalInformation' : 'information');
    };

    const emptyContent = (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0px 0px 20px 0px",
                }}
            >
                <RobotOutlined
                    style={{
                        fontSize: "24px",
                        marginRight: "8px",
                        color: color.colorPrimary,
                    }}
                />
                <Text style={{ color: color.colorTextTertiary }}>
                    Start a new conversation
                </Text>
            </div>
            <SuggestionCard onSelectSuggestion={handleSelectSuggestion} />
        </div>
    );

    return (
        <Drawer
            title={`Chatbot - ${currentScreen === 'information' ? 'Information' : 'Technical Information'}`}
            placement="right"
            onClose={onClose}
            open={visible}
            width={650}
            bodyStyle={{ padding: "20px" }}
        >
            <Button
                type="default"
                onClick={handleSwitchScreen}
                icon={<SwitcherOutlined />}
                style={{ marginBottom: "16px" }}
            >
                Switch to {currentScreen === 'information' ? 'Technical Information' : 'Information'}
            </Button>
            {currentScreen === 'technicalInformation' && TSId && (
                <Button
                    type="primary"
                    onClick={handlePremiumButtonClick}
                    icon={<StarOutlined />}
                    style={{ marginBottom: "16px" }}
                >
                    Premium Function
                </Button>
            )}
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
                            <RobotOutlined
                                style={{
                                    fontSize: "24px",
                                    marginRight: "8px",
                                    color: color.colorPrimary,
                                }}
                            />
                        )}
                        <div
                            style={{
                                maxWidth: "70%",
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: item?.sender === "bot" ? "#F0F0F0" : color.colorPrimary,
                                textAlign: item?.sender === "bot" ? "left" : "right",
                            }}
                        >
                            <Text
                                style={{
                                    color: item?.sender === "bot" ? "#000" : "#fff",
                                }}
                            >
                                {item.text}
                            </Text>
                        </div>
                        {item?.sender === "user" && (
                            <Avatar style={{ marginLeft: "10px" }}>
                                {item?.sender.charAt(0)}
                            </Avatar>
                        )}
                    </List.Item>
                )}
                locale={{
                    emptyText: emptyContent,
                }}
            />
            <Divider />
            <Space.Compact
                compact="true"
                style={{ display: "flex", alignItems: "start" }}
            >
                <TextArea
                    rows={2}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        marginRight: "5px",
                        height: "80px",
                        resize: "none",
                    }}
                />
                <Button
                    type="primary"
                    onClick={handleSend}
                    icon={
                        <SendOutlined
                            style={{ transform: "rotate(-35deg)", fontSize: "16px" }}
                        />
                    }
                    style={{ height: "40px" }}
                />
            </Space.Compact>
        </Drawer>
    );
};
