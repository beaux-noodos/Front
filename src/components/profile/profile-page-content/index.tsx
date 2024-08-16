import {
    type HttpError,
    useList,
} from "@refinedev/core";
import {
    Card,
    Col,
    Divider,
    Flex,
    Input,
    Row,
    Select,
    Skeleton,
    Tabs,
    Typography,
} from "antd";
import React, { useState } from "react";
import { IUser } from "../../../interfaces";
import { CommentButton, LikeButton } from "../../../button";
import { CommentModal } from "../../modal/commendModal";
import {TeamOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;

export const ProfilePageContent = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [activeRole, setActiveRole] = useState("ALL");

    const showModal = (data) => {
        setIsModalOpen(true);
        setSelectedData(data);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { data, isLoading, isError } = useList<IUser, HttpError>({
        resource: 'users',
        pagination: {
            current: current,
            pageSize: pageSize,
        },
    });

    if (isLoading) {
        return <Skeleton active />;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    const { data: users, total } = data || { data: [], total: 0 };

    const filteredUsers = activeRole === "ALL" ? users : users.filter(user => user.role === activeRole);

    // Example comments data with dates
    const comments = [
        { id: 1, date: new Date(), text: "Great post!", user: "User1" },
        { id: 2, date: new Date(), text: "Very informative.", user: "User2" },
        { id: 3, date: new Date(), text: "Thanks for sharing.", user: "User3" },
    ];

    return (
        <>
            <Divider style={{ margin: "16px 0px" }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <Tabs defaultActiveKey="ALL" onChange={(key) => setActiveRole(key)}>
                    <TabPane
                        tab={
                            <>
                                <TeamOutlined style={{ marginRight: 8 }} />
                                All
                            </>
                        }
                        key="ALL"
                    />
                    <TabPane
                        tab={
                            <>
                                <UsergroupAddOutlined style={{ marginRight: 8 }} />
                                CLIENT
                            </>
                        }
                        key="CLIENT"
                    />
                    <TabPane
                        tab={
                            <>
                                <UserOutlined style={{ marginRight: 8 }} />
                                MANAGER
                            </>
                        }
                        key="MANAGER"
                    />
                </Tabs>
            </div>

            <Row gutter={[16, 16]}>
                {filteredUsers.map((user) => (
                    <Col key={user.id} span={8}>
                        <Card
                            hoverable
                            bordered={false}
                            cover={
                                <img
                                    src={user.profilePicture}
                                    alt={user.first_name}
                                    style={{ height: 160, objectFit: "cover" }}
                                />
                            }
                            actions={[
                                <Flex
                                    key="actions"
                                    style={{
                                        padding: "0 16px",
                                    }}
                                >
                                    <LikeButton initialLiked={false} />
                                    <CommentButton showModal={() => showModal(user)} />
                                </Flex>,
                            ]}
                            onClick={() => showModal(user)}
                        >
                            <Card.Meta
                                title={
                                    <Typography.Title level={4}>
                                        {user.first_name}
                                    </Typography.Title>
                                }
                                description={
                                    <>
                                        <Typography.Text>
                                            {user.email}
                                        </Typography.Text>
                                        <br />
                                        <Typography.Text>
                                            {user.role}
                                        </Typography.Text>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider style={{ margin: "16px 0px" }} />
            <Row gutter={[16, 16]} align="middle" style={{ marginBlock: '16px' }}>
                <Col>
                    <span>
                        Go to page:{" "}
                        <Input
                            type="number"
                            value={current}
                            min={1}
                            onChange={(e) => setCurrent(Number(e.target.value))}
                            style={{ width: 60 }}
                        />
                    </span>
                </Col>
                <Col>
                    <Select
                        value={pageSize}
                        onChange={(value) => setPageSize(value)}
                        style={{ width: 120 }}
                    >
                        {[3, 6, 12, 18, 24, 30, 36].map((size) => (
                            <Select.Option key={size} value={size}>
                                Show {size}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <CommentModal
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    data={selectedData}
                    comments={comments}
                />
            </Row>
        </>
    );
};