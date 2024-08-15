import {
    type BaseKey,
    type HttpError,
    useGetToPath,
    useGo,
    useNavigation,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {List, Typography, Space, theme, Card, Grid, Flex} from "antd";
import {useSearchParams} from "react-router-dom";
import {Drawer} from "../../drawer";
import type {IUser, IXxxxxx} from "../../../interfaces";
import {XxxxxxButtonAction} from "../xxxxxx-button-action";
import React from "react";
import {EnvironmentOutlined, MailOutlined} from "@ant-design/icons";

type Props = {
    id?: BaseKey;
    onClose?: () => void;
    onEdit?: () => void;
};

export const XxxxxxDrawerShow = (props: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const {editUrl} = useNavigation();
    const t = useTranslate();
    const {token} = theme.useToken();
    const breakpoint = Grid.useBreakpoint();

    const {queryResult} = useShow<IXxxxxx, HttpError>({
        resource: "xxxxxxs",
        id: props?.id, // when undefined, id will be read from the URL.
    });

    const xxxxxx = queryResult.data?.data;

    const handleDrawerClose = () => {
        if (props?.onClose) {
            props.onClose();
            return;
        }

        go({
            to:
                searchParams.get("to") ??
                getToPath({
                    action: "list",
                }) ??
                "",
            query: {
                to: undefined,
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    };

    const handleDrawerEdit = () => {
        if (props?.onEdit) {
            return props.onEdit();
        }

        return go({
            to: `${editUrl("xxxxxxs", xxxxxx?.id || "")}`,
            query: {
                to: "/xxxxxxs",
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    }

    return (
        <Drawer
            open={true}
            width={breakpoint.sm ? "378px" : "100%"}
            zIndex={1001}
            onClose={handleDrawerClose}
        >
            <Flex
                vertical
                gap={32}
                style={{
                    padding: "32px",
                }}
            >
                <Card
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
                                title: t("date.creation_datetime"),
                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                icon: <MailOutlined style={{ color: token.colorPrimary }} />,
                                value: <Typography.Text>{xxxxxx?.creation_datetime}</Typography.Text>,
                            },
                            {
                                title: t("date.updated_at"),
                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                icon: <EnvironmentOutlined
                                    style={{ color: token.colorPrimary }} />,
                                value: (
                                    <Space direction="vertical">
                                        <Typography.Text
                                            style={{
                                                color:  token.colorText
                                            }}
                                        >
                                            {xxxxxx?.updated_at}
                                        </Typography.Text>
                                    </Space>
                                ),
                            },
                            {
                                title: t("users.fields.firstName"),
                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                icon: <EnvironmentOutlined
                                    style={{ color: token.colorPrimary }} />,
                                value: (
                                    <Space direction="vertical">
                                        <Typography.Text
                                            style={{
                                                color:  token.colorText
                                            }}
                                        >
                                            {xxxxxx?.user?.first_name}
                                        </Typography.Text>
                                    </Space>
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
                </Card>
            </Flex>
            <XxxxxxButtonAction xxxxxx={xxxxxx} handleDrawerClose={handleDrawerClose} handleDrawerEdit={handleDrawerEdit} />
        </Drawer>
    );
};