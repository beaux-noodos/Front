import React from "react";
import type { IUser } from "../../../interfaces";
import {
    PhoneOutlined,
    EnvironmentOutlined,
    CheckCircleOutlined,
    RightCircleOutlined,
    UserOutlined,
    CalendarOutlined, MailOutlined,
} from "@ant-design/icons";
import { List, Typography, Space, theme, Card } from "antd";
import dayjs from "dayjs";
import { useTranslate } from "@refinedev/core";
import {UserStatus} from "../../customer/userStatus";

type Props = {
  user?: IUser;
};

export const UserInfoList = ({ user }: Props) => {
  const { token } = theme.useToken();
  const t = useTranslate();

  return (
    (<Card
      bordered={false}
      styles={{
        body: {
          padding: "0 16px 0 16px",
        },
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            title: t("users.fields.email"),
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            icon: <MailOutlined style={{ color: token.colorPrimary }} />,
            value: <Typography.Text>{user?.email}</Typography.Text>,
          },
          {
            title: t("users.fields.addresse"),
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            icon: <EnvironmentOutlined style={{ color: token.colorPrimary }} />,
            value: (
              <Space direction="vertical">
                  <Typography.Text
                      style={{
                          color:  token.colorText
                      }}
                  >
                      {user?.email}
                  </Typography.Text>
              </Space>
            ),
          },
          {
            title: t("users.fields.isActive.label"),
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            icon: <UserOutlined style={{ color: token.colorPrimary }} />,
            value: <UserStatus value={!!user?.status} />,
          },
          {
            title: t("users.fields.createdAt"),
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            icon: <CalendarOutlined style={{ color: token.colorPrimary }} />,
            value: (
              <Typography.Text>
                {dayjs(user?.entrance_datetime).format("MMMM, YYYY HH:mm A")}
              </Typography.Text>
            ),
          },
        ]}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={item.icon}
                title={
                  <Typography.Text type="secondary">
                    {item.title}
                  </Typography.Text>
                }
                description={item.value}
              />
            </List.Item>
          );
        }}
      />
    </Card>)
  );
};
