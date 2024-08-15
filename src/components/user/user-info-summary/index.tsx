import {Flex, Avatar, Typography, theme} from "antd";
import type {IUser} from "../../../interfaces";

type Props = {
    user?: IUser;
};

export const UserInfoSummary = ({user}: Props) => {
    const { token: color } = theme.useToken();
    return (
        <Flex align="center" gap={32}>
            <Avatar size={96} src={user?.photo_url?.[0]?.url}/>
            <Flex vertical>
                <Typography.Text type="secondary">{user?.first_name}</Typography.Text>
                <Typography.Title
                    level={3}
                    style={{
                        margin: 0,
                    }}
                >
                    {user?.last_name}
                </Typography.Title>
                <Typography.Text type="primary" style={{color: color.colorPrimary}}>{user?.role}</Typography.Text>
            </Flex>
        </Flex>
    );
};
