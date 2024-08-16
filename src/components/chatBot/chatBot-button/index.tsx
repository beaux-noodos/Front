import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

interface ChatButtonProps {
    onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
    return (
        <Button
            type="primary"
            shape="circle"
            icon={<MessageOutlined style={{ fontSize: '24px' }} />}
            size="large"
            style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                zIndex: 1000,
                width: "50px",
                height: "50px",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
            }}
            onClick={onClick}
        />
    );
};