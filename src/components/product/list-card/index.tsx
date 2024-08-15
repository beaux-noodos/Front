import {
    type HttpError,
    useGo,
    useNavigation,
    useTranslate,
} from "@refinedev/core";
import { NumberField, useSimpleList } from "@refinedev/antd";
import type {IYyyyyy} from "../../../interfaces";
import {
    Card,
    Flex,
    List,
    Tag,
    Typography,
    theme,
} from "antd";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, TagOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";
import { useLocation } from "react-router-dom";
import { CommentButton, LikeButton } from "../../../button";
import {useTable} from "@refinedev/antd";

export const ProductListCard = () => {
    const { styles, cx } = useStyles();
    const { token } = theme.useToken();
    const go = useGo();
    const { pathname } = useLocation();
    const { showUrl } = useNavigation();

    const {
        listProps: yyyyyyListProps,
    } = useTable<IYyyyyy, HttpError>();

    return (
        <>
            <List
                {...yyyyyyListProps}
                pagination={{
                    ...yyyyyyListProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal total={total} entityName={"yyyyyys"} />
                    ),
                }}
                grid={{
                    gutter: [16, 16],
                    column: 1,
                    xxl: 3,
                    xl: 3,
                    lg: 3,
                    md: 2,
                    sm: 1,
                    xs: 1,
                }}
                renderItem={(item) => (
                    <List.Item style={{ height: "100%" }}>
                        <Card
                            hoverable
                            bordered={false}
                            className={styles.card}
                            styles={{
                                body: {
                                    padding: 16,
                                },
                                cover: {
                                    position: "relative",
                                },
                                actions: {
                                    marginTop: "auto",
                                },
                            }}
                            cover={
                                <>
                                    <Tag
                                        onClick={() => {
                                            return go({
                                                to: `${showUrl("yyyyyys", item.id)}`,
                                                query: {
                                                    to: pathname,
                                                },
                                                options: {
                                                    keepQuery: true,
                                                },
                                                type: "replace",
                                            });
                                        }}
                                        className={cx(styles.viewButton, "viewButton")}
                                        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                        icon={<EyeOutlined />}
                                    >
                                        View
                                    </Tag>
                                    <img
                                        src={item.images[0].url}
                                        alt={item.images[0].name}
                                        style={{
                                            aspectRatio: 288 / 160,
                                            objectFit: "cover",
                                        }}
                                    />
                                </>
                            }
                            actions={[
                                <Flex
                                    key="actions"

                                    style={{
                                        padding: "0 16px",
                                    }}
                                >
                                    <LikeButton initialLiked={false} />
                                    <CommentButton productImage={item.id} />
                                </Flex>,
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <Flex>
                                        <Typography.Title
                                            level={5}
                                            ellipsis={{
                                                rows: 1,
                                                tooltip: item.name,
                                            }}
                                        >
                                            {item.name}
                                        </Typography.Title>

                                        <NumberField
                                            value={item.price}
                                            style={{
                                                paddingLeft: "8px",
                                                marginLeft: "auto",
                                            }}
                                            options={{
                                                style: "currency",
                                                currency: "USD",
                                            }}
                                        />
                                    </Flex>
                                }
                                description={item.description}
                            />

                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
};