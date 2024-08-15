import { Button} from "antd";
import { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { CommentModal } from "../components/modal/commentModal";

type Props = {
    showModal: ()=> void;
}

export const CommentButton = (props: Props) => {
    const { showModal } = props;

    return (
        <>
            <Button
                type="text"
                icon={
                    <MessageOutlined
                        style={{ fontSize: "24px" }}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                }
                onClick={showModal}
                style={{ padding: "0 20px" }}
            />
        </>
    );
};