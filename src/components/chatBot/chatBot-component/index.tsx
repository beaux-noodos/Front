import React, { useState } from 'react';
import {ChatButton} from "../chatBot-button";
import {ChatDrawer} from "../chatBot-drawer";
import {TrainingDrawer, TrainingList} from "../training-component";

export const ChatbotComponent: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    return (
        <>
            <ChatButton onClick={() => setDrawerVisible(true)} />
            <ChatDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
            <TrainingDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
        </>
    );
};