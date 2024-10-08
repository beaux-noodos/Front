import {
    type HttpError,
    useGo,
    useList,
    useNavigation,
    useTranslate,
} from "@refinedev/core";
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider, Flex,
    Input,
    Pagination,
    Row,
    Select,
    Skeleton,
    Typography,
} from "antd";
import React, {useState, useEffect} from "react";
import {IProject, IUser,} from "../../../interfaces";
import {CommentButton, LikeButton} from "../../../button";
import {CommentModal} from "../../modal/commendModal";
import {EyeOutlined, UserOutlined} from "@ant-design/icons";
import {formatDate} from "../../../utils/formatDate";
import {storeFirstTechnicalSolutionId} from "../../../utils/getFirstTechnicalSolutionId";

export const BlogListCard = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});


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

    const {data, isLoading, isError, refetch} = useList<IProject, HttpError>({
        resource: 'projects',
        pagination: {
            current: current,
            pageSize: pageSize,
        },
    });

    if (isLoading) {
        return <Skeleton active/>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    const {data: projects, total} = data || {data: [], total: 0};

    // Example comments data with dates
    const comments = [
        {id: 1, date: new Date(), text: "Great post!", user: "User1"},
        {id: 2, date: new Date(), text: "Very informative.", user: "User2"},
        {id: 3, date: new Date(), text: "Thanks for sharing.", user: "User3"},
    ];

    storeFirstTechnicalSolutionId(projects);

    return (
        <>
            <Divider style={{margin: "16px 0px"}}/>
            <Row gutter={[16, 16]}>
                {projects.map((project) => (
                    <Col key={project.id} span={8}>
                        <Card
                            hoverable
                            bordered={false}
                            cover={
                                <img
                                    src={project?.user?.photo_url}
                                    alt={project?.user?.first_name}
                                    style={{height: 160, objectFit: "cover"}}
                                />
                            }
                            actions={[
                                <Flex
                                    key="actions"
                                    style={{padding: "0 16px", display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <LikeButton initialLiked={false}/>
                                        </div>
                                        <div>
                                            <CommentButton showModal={() => showModal(project)}/>
                                        </div>
                                    </div>
                                    <div onClick={(e) => e.stopPropagation()} style={{display: 'flex', alignItems: 'center', cursor: 'default'}} >
                                        <EyeOutlined style={{marginRight: 4}}/>
                                        <Typography.Text>
                                            {project?.view_number} views
                                        </Typography.Text>
                                    </div>
                                </Flex>,
                            ]}
                            onClick={() => showModal(project)}
                        >
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        src={project?.user?.avatarUrl}
                                        icon={<UserOutlined/>}
                                        alt={project?.user?.first_name}
                                    />
                                }
                                title={
                                    <Typography.Title level={4}>
                                        {project?.user?.first_name + ' ' + project?.user?.last_name}
                                    </Typography.Title>
                                }
                                description={
                                    <>
                                        <Typography.Text type="secondary" style={{
                                            display: "block",
                                            marginBottom: 8,
                                            marginTop: -20,
                                            fontSize: ".7rem"
                                        }}>
                                            {formatDate(project?.creation_datetime)}
                                        </Typography.Text>
                                        <Flex style={{alignItems: "center"}}>
                                            <Typography.Title style={{marginRight: 8}} level={4}>
                                                {project?.title}
                                            </Typography.Title>
                                        </Flex>
                                        <Typography.Paragraph>
                                            {project?.description}
                                        </Typography.Paragraph>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Divider style={{margin: "16px 0px"}}/>
            <Row gutter={[16, 16]} align="middle" style={{marginBlock: '16px'}}>
                <Col>
                    <span>
                        Go to page:{" "}
                        <Input
                            type="number"
                            value={current}
                            min={1}
                            onChange={(e) => {
                                setCurrent(e.target.value)
                            }}
                            style={{width: 60}}
                        />
                    </span>
                </Col>
                <Col>
                    <Select
                        value={pageSize}
                        onChange={(value) => setPageSize(value)}
                        style={{width: 120}}
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