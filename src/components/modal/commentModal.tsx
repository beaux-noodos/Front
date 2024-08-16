import React, {useState} from "react";
import {
    Modal,
    List,
    Typography,
    Avatar,
    Row,
    Col,
    Image,
    Input,
    Button,
    Form, theme,
} from "antd";
import {ICommentModalProps} from "../../interfaces";
import {MessageOutlined, ShareAltOutlined, UserOutlined} from "@ant-design/icons";
import {LikeButton} from "../../button";

export const CommentModal: React.FC<ICommentModalProps> = (
    {
        isModalOpen,
        handleCancel,
        data,
        comments,
    }) => {
    const [newComment, setNewComment] = useState("");
    const [form] = Form.useForm();

    const {token} = theme.useToken();

    const handleSubmit = () => {
        if (newComment.trim()) {
            setNewComment("");
            form.resetFields();
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width="75vw"
            centered
        >
            <Row gutter={6}>
                <Col xs={24} sm={16} md={12}>
                    <Image
                        src={data?.productImage}
                        alt="Product"
                        style={{
                            borderRadius: "8px",
                            height: "600px",
                            maxHeight: "100%",
                            width: "550px",
                            maxWidth: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Col>
                <Col xs={24} sm={8} md={11}>
                    <div
                        style={{
                            width: "100%",
                            padding: "16px",
                            borderLeft: "1px solid #e8e8e8",
                        }}
                    >
                        <Avatar
                            src={data?.avatarUrl}
                            icon={<UserOutlined/>}
                            alt={data?.user?.first_name}
                        />
                        <Typography.Text style={{marginLeft: '.7rem'}}>
                            {data?.user?.first_name + ' ' + data?.user?.last_name}
                        </Typography.Text>
                        <br/>
                        <Typography.Text>
                            {data?.role}
                        </Typography.Text>
                    </div>
                    <div
                        style={{
                            height: "300px",
                            width: "100%",
                            overflowY: "scroll",
                            padding: "16px",
                            borderLeft: "1px solid #e8e8e8",
                        }}
                    >
                        <List
                            dataSource={comments}
                            itemLayout="horizontal"
                            renderItem={(item) => (
                                <List.Item
                                    style={{
                                        borderBottom: "1px solid #e8e8e8",
                                        padding: "10px 0",
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar>{item.user[0]}</Avatar>}
                                        title={
                                            <Typography.Text strong>{item.user}</Typography.Text>
                                        }
                                        description={
                                            <>
                                                <Typography.Text>{item.text}</Typography.Text>
                                            </>
                                        }
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "8px",
                                        }}
                                    >
                                        <LikeButton initialLiked={item.isLiked}/>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "16px",
                            borderTop: "1px solid #e8e8e8",
                        }}
                    >
                        <LikeButton initialLiked={false}/>
                        <Button
                            type="text"
                            icon={
                                <MessageOutlined
                                    style={{fontSize: "24px"}}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                />
                            }
                            style={{padding: "0 20px"}}
                        />
                        <Button
                            type="text"
                            icon={
                                <ShareAltOutlined
                                    style={{fontSize: "24px"}}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                />
                            }
                            style={{padding: "0 20px"}}
                        />
                    </div>
                    <div
                        style={{
                            padding: "0 16px 16px",
                            borderBottom: "1px solid #e8e8e8",
                        }}
                    >
                        <Typography.Text strong>Liked by</Typography.Text>
                        <Avatar.Group
                            maxCount={3}
                            size="small"
                            style={{marginLeft: "8px"}}
                        >
                            <Avatar src="https://example.com/avatar1.jpg"/>
                            <Avatar src="https://example.com/avatar2.jpg"/>
                            <Avatar src="https://example.com/avatar3.jpg"/>
                            <Avatar src="https://example.com/avatar4.jpg"/>
                        </Avatar.Group>
                        <Typography.Text style={{marginLeft: "8px"}}>
                            and others
                        </Typography.Text>
                    </div>
                    <div style={{padding: "16px", borderTop: "1px solid #e8e8e8"}}>
                        <Form
                            form={form}
                            layout="inline"
                            onFinish={handleSubmit}
                            style={{display: "flex", justifyContent: "center", gap: "8px"}}
                        >
                            <Form.Item
                                name="comment"
                                style={{flex: 1, margin: 0}}
                                rules={[{required: true, message: "Please enter a comment!"}]}
                            >
                                <Input.TextArea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={2}
                                    placeholder="Add a comment..."
                                    style={{
                                        resize: "none",
                                        width: "100%",
                                        border: "1px solid #e8e8e8",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item style={{margin: 0}}>
                                <Button
                                    type="text"
                                    htmlType="submit"
                                    style={{borderRadius: "20px", color: token.colorPrimary}}
                                >
                                    Post
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};
