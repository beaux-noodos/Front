import React, { useState } from "react";
import {
  Modal,
  Typography,
  Avatar,
  Row,
  Col,
  Input,
  Button,
  Form,
  theme,
} from "antd";
import { MessageOutlined, ShareAltOutlined } from "@ant-design/icons";
import { LikeButton } from "../../../button";
import { IProject } from "../../../interfaces";
import { dateFormatter } from "../../../utils/formatDate/dateFormatter";

const { Text, Title, Paragraph } = Typography;

interface CommentModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IProject;
  comments: { user: string; text: string; isLiked: boolean }[];
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isModalOpen,
  handleCancel,
  data,
  comments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const handleSubmit = () => {
    if (newComment.trim()) {
      // Handle comment submission logic here
      setNewComment("");
      form.resetFields();
    }
  };

  const getRole = () => {
    if (data?.need_investor && data?.need_technical_solution) {
      return "Needs Investor & Technical Solution";
    } else if (data?.need_investor) {
      return "Needs Investor";
    } else if (data?.need_technical_solution) {
      return "Needs Technical Solution";
    } else {
      return "No Specific Needs";
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="70%"
      centered
      style={{ borderRadius: "8px" }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <div style={{ padding: "1rem", borderRadius: "8px", border: "1px solid #e8e8e8", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              {data?.user?.photo_url && (
                <Avatar
                  src={data.user.photo_url}
                  alt="user picture"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", fontSize: "16px" }}>
                  {`${data?.user?.first_name} ${data?.user?.last_name}`}
                </Text>
                <Text style={{ marginLeft: "1rem", fontSize: "14px", color: "#888" }}>
                  {dateFormatter(data?.creation_datetime).slice(0, -5)}
                </Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Text style={{ fontSize: "14px", color: "#1890ff" }}>
                  {getRole()}
                </Text>
              </div>
            </div>

            <Title level={3} style={{ margin: "1rem 0", fontSize: "36px" }}>
              {data?.title}
            </Title>

            <Paragraph style={{ margin: "0 1rem", fontSize: "16px" }}>
              {data?.description}
            </Paragraph>

            {data?.image_url && (
              <div style={{ margin: "1rem", textAlign: "center" }}>
                <img
                  src={data.image_url}
                  alt="Description Image"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", padding: "16px 0", borderTop: "1px solid #e8e8e8" }}>
              <div style={{ flexGrow: 1 }}>
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  Price: <span style={{ color: "#1890ff" }}>{data?.price}</span>
                </Text>
                {(data?.need_investor || data?.need_technical_solution) && (
                  <Text style={{ marginLeft: "1rem", fontSize: "16px", fontWeight: "500" }}>
                    End Date: <span style={{ color: "#1890ff" }}>{dateFormatter(data?.end_datetime)}</span>
                  </Text>
                )}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <LikeButton initialLiked={false} />
                <Button
                  type="text"
                  icon={<MessageOutlined style={{ fontSize: "24px" }} />}
                />
                <Button
                  type="text"
                  icon={<ShareAltOutlined style={{ fontSize: "24px" }} />}
                />
              </div>
            </div>

            <div style={{ padding: "16px 0", borderBottom: "1px solid #e8e8e8" }}>
              <Text strong>Liked by</Text>
              <Avatar.Group
                maxCount={3}
                size="small"
                style={{ marginLeft: "8px" }}
              >
                <Avatar src="https://example.com/avatar1.jpg" />
                <Avatar src="https://example.com/avatar2.jpg" />
                <Avatar src="https://example.com/avatar3.jpg" />
                <Avatar src="https://example.com/avatar4.jpg" />
              </Avatar.Group>
              <Text style={{ marginLeft: "8px" }}>and others</Text>
            </div>

            <div style={{ padding: "16px 0", borderTop: "1px solid #e8e8e8" }}>
              <Form
                form={form}
                layout="inline"
                onFinish={handleSubmit}
                style={{ display: "flex", justifyContent: "center", gap: "8px" }}
              >
                <Form.Item
                  name="comment"
                  style={{ flex: 1, margin: 0 }}
                  rules={[{ required: true, message: "Please enter a comment!" }]}
                >
                  <Input.TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    placeholder="Add a comment..."
                    style={{ resize: "none", border: "1px solid #e8e8e8" }}
                  />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                  <Button
                    type="text"
                    htmlType="submit"
                    style={{ borderRadius: "20px", color: token.colorPrimary }}
                  >
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
