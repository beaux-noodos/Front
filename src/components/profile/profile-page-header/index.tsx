import React, { useState, useEffect } from "react";
import { Avatar, Typography, Row, Col, Button, Space, Dropdown, Menu, theme, Spin } from "antd";
import { SettingOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { getCachedUser } from "../../../utils/getCachedUser";
import { StyledParagraph } from "./styled-paragraph";
import { ProfileModalForm } from "../profile-modal-form";
import { createAuthenticatedRequest } from "../../../provider/api";
import { User } from "../../../gen";
import {useLogout} from "@refinedev/core";

const { Title, Text } = Typography;
const { userApi } = createAuthenticatedRequest();

export const ProfilePageHeader = () => {
    const cachedUser = getCachedUser();
    const { token } = theme.useToken();
    const { mutate: logout } = useLogout();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (cachedUser?.id) {
                setLoading(true);
                try {
                    const response = await userApi.getUserById(cachedUser.id);
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [cachedUser?.id]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => logout()}>
                Log out
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
                <Col xs={24} sm={4}>
                    <Avatar size={128} src={user?.avatar} icon={<UserOutlined />} />
                </Col>
                <Col xs={24} sm={20}>
                    <Space size="middle" direction="vertical">
                        <Row align="middle" gutter={[16, 16]}>
                            <Col>
                                <Title level={3} style={{ margin: 0 }}>
                                    {user?.first_name}
                                </Title>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={toggleModal}>
                                    Edit profile
                                </Button>
                            </Col>
                            <Col>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button icon={<SettingOutlined />} />
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Text>{user?.posts} posts</Text>
                            </Col>
                            <Col>
                                <Text>{user?.followers} followers</Text>
                            </Col>
                            <Col>
                                <Text>{user?.following} following</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Text strong style={{ fontSize: ".7rem" }}>{`${user?.last_name} ${user?.first_name}`}</Text>
                        </Row>
                        <Row>
                            <StyledParagraph
                                copyable={{
                                    text: async () =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve(user?.email);
                                            }, 500);
                                        }),
                                }}
                                style={{ fontSize: ".7rem" }}
                            >
                                {user?.email}
                            </StyledParagraph>
                        </Row>
                    </Space>
                </Col>
            </Row>

            {loading ? (
                <Spin />
            ) : (
                <ProfileModalForm
                    action="edit"
                    id={user?.id}
                    user={user}
                    onClose={closeModal}
                    onUserUpdate={handleUserUpdate}
                    isModalOpen={isModalOpen}
                />
            )}
        </>
    );
};
