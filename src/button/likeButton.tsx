import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export const LikeButton = ({ initialLiked = false }) => {
    const [liked, setLiked] = useState(initialLiked);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <Button
            type="text"
            icon={liked ? <HeartFilled style={{ color: "red", fontSize: "24px" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                : <HeartOutlined style={{ fontSize: "24px" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            onClick={handleLike}
            style={{ padding: "0 20px" }}
        />
    );
};