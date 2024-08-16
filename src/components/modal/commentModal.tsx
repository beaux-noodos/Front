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
import { IProject } from "../../interfaces";
import { MessageOutlined, ShareAltOutlined } from "@ant-design/icons";
import { LikeButton } from "../../button";
import { formatDate } from "../../utils/formatDate";

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

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="60%"
      centered
    >
      <Row gutter={0} justify="center">
        <Col xs={24} sm={24} md={24}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography.Text style={{ marginLeft: "3rem" }}>
                  {`${data?.user?.first_name} ${data?.user?.last_name}`}
                </Typography.Text>
                <Typography.Text style={{ marginRight: "3rem" }}>
                  {formatDate(data?.creation_datetime)}{" "}
                  {/* Display creation date */}
                </Typography.Text>
              </div>

              <Typography.Text style={{ marginRight: "3rem" }}>
                {data?.user?.role}
              </Typography.Text>
            </div>
            <div style={{ marginLeft: "3rem" }}>
              <Typography.Title level={5} style={{ marginTop: "1.5rem" }}>
                {data?.title}
              </Typography.Title>
            </div>
            <Typography.Paragraph style={{ marginLeft: "3rem" }}>
              {data?.description}
            </Typography.Paragraph>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 0",
              borderTop: "1px solid #e8e8e8",
            }}
          >
            <LikeButton initialLiked={false} />
            <Button
              type="text"
              icon={<MessageOutlined style={{ fontSize: "24px" }} />}
              style={{ padding: "0 20px" }}
            />
            <Button
              type="text"
              icon={<ShareAltOutlined style={{ fontSize: "24px" }} />}
              style={{ padding: "0 20px" }}
            />
          </div>
          <div
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #e8e8e8",
            }}
          >
            <Typography.Text strong>Liked by</Typography.Text>
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
            <Typography.Text style={{ marginLeft: "8px" }}>
              and others
            </Typography.Text>
          </div>
          <div style={{ padding: "16px 0", borderTop: "1px solid #e8e8e8" }}>
            <Form
              form={form}
              layout="inline"
              onFinish={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
              }}
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
                  style={{
                    resize: "none",
                    width: "100%",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </Form.Item>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="text"
                  htmlType="submit"
                  style={{
                    borderRadius: "20px",
                    color: token.colorPrimary,
                  }}
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
