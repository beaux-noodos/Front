import React, {useState} from 'react';
import {Input, Button, List, Avatar, Typography, Drawer, Divider, theme, Space} from 'antd';
import {MessageOutlined, RobotOutlined, SendOutlined} from '@ant-design/icons';
import {useChat} from "../../../context/chatBotProvider";

const {TextArea} = Input;
const {Text} = Typography;

export const ChatbotComponent: React.FC = () => {
    const {messages, sendMessage} = useChat();
    const [inputValue, setInputValue] = useState('');
    const [visible, setVisible] = useState(false);

    const { token: color } = theme.useToken();

    const handleSend = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <>
            <Button
                type="primary"
                shape="circle"
                icon={<MessageOutlined/>}
                size="large"
                style={{position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000}}
                onClick={() => setVisible(true)}
            />
            <Drawer
                title="Chatbot"
                placement="right"
                onClose={() => setVisible(false)}
                open={visible}
                width={400}
                bodyStyle={{padding: '20px'}}
            >
                <List
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                display: 'flex',
                                justifyContent: item?.sender === 'bot' ? 'flex-start' : 'flex-end',
                                alignItems: 'end',
                                marginBottom: '10px',
                            }}
                        >
                            {item?.sender === 'bot' && (
                                <RobotOutlined style={{ fontSize: '24px', marginRight: '8px', color: color.colorPrimary }} />
                            )}
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: item?.sender === 'bot' ? '#F0F0F0' : color.colorPrimary,
                                    textAlign: item?.sender === 'bot' ? 'left' : 'right',
                                }}
                            >
                                <Text
                                    style={{
                                        color: item?.sender === 'bot' ? '#000' : '#fff',
                                    }}>{item.text}</Text>
                            </div>
                            {item?.sender === 'user' && (
                                <Avatar style={{marginLeft: '10px'}}>
                                    {item?.sender.charAt(0)}
                                </Avatar>
                            )}
                        </List.Item>
                    )}
                    locale={{
                        emptyText: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <RobotOutlined style={{ fontSize: '24px', marginRight: '8px', color: color.colorPrimary }} />
                                <Text style={{color: color.colorTextTertiary}}>Start a new conversation</Text>
                            </div>
                        )
                    }}
                />
                <Divider/>
                <Space.Compact compact="true" style={{ display: 'flex', alignItems: 'start' }}>
                    <TextArea
                        rows={2}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleSend}
                        placeholder="Type your message..."
                        style={{
                            flex: 1,
                            marginRight: '5px',
                            height: '80px',
                            resize: 'none',
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={handleSend}
                        icon={<SendOutlined style={{ transform: 'rotate(-35deg)', fontSize: '16px' }} />}
                        style={{ height: '40px' }}
                    />
                </Space.Compact>
            </Drawer>
        </>
    );
};