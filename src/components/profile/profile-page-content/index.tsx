import { type HttpError, useList } from "@refinedev/core";
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
import { IProject } from "../../../interfaces";
import { CommentButton, LikeButton } from "../../../button";
import { CommentModal } from "../../modal/commendModal";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

export const ProfilePageContent = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [statusActive, setstatusActive] = useState("PLANNING");

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

  const { data, isLoading, isError } = useList<IProject, HttpError>({
    resource: "projects",
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

  const { data: projects, total } = data || { data: [], total: 0 };

  const filteredProjects =
    statusActive === "PLANNING"
      ? projects
      : projects.filter((project) => project.status === statusActive);

  return (
    <>
      <Divider style={{ margin: "16px 0px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Tabs defaultActiveKey="ALL" onChange={(key) => setstatusActive(key)}>
          <TabPane
            tab={
              <>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Planning
              </>
            }
            key="PLANNING"
          />
          <TabPane
            tab={
              <>
                <CheckCircleOutlined style={{ marginRight: 8 }} />
                Confirmed
              </>
            }
            key="CONFIRMED"
          />
          <TabPane
            tab={
              <>
                <CheckOutlined style={{ marginRight: 8 }} />
                Completed
              </>
            }
            key="COMPLETED"
          />
        </Tabs>
      </div>

      <Row gutter={[16, 16]}>
        {filteredProjects.map((project) => (
          <Col key={project.id} span={8}>
            <Card
              hoverable
              bordered={false}
              cover={
                <img
                  src={project.image_url}
                  alt="project image"
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
                  <CommentButton showModal={() => showModal(project)} />
                </Flex>,
              ]}
              onClick={() => showModal(project)}
            >
              <Card.Meta
                title={
                  <Typography.Title level={4}>{project.title}</Typography.Title>
                }
                description={
                  <>
                    <Typography.Text>{project.description}</Typography.Text>
                    <br />
                    <Typography.Text>{project.price}</Typography.Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider style={{ margin: "16px 0px" }} />
      <Row gutter={[16, 16]} align="middle" style={{ marginBlock: "16px" }}>
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
        />
      </Row>
    </>
  );
};
