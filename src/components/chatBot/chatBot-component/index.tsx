import React, { useState } from 'react';
import {ChatButton} from "../chatBot-button";
import {ChatDrawer} from "../chatBot-drawer";
import {TrainingDrawer, TrainingList} from "../training-component";
import {getCachedUser} from "../../../utils/getCachedUser";

export const ChatbotComponent: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const user = getCachedUser();

    const role = user?.role;

    return (
        <>
            <ChatButton onClick={() => setDrawerVisible(true)} />
            {role === "TECHNICAL_SOLUTION"
                ?
                <TrainingDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)}/>
                :
                <ChatDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
            }
        </>
    );
};