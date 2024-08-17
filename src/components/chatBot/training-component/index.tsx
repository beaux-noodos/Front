import React, { useEffect, useState } from 'react';
import { Drawer, List, Input, Form, Button, Card, theme, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { EditOutlined, DeleteOutlined, PlusOutlined, RobotOutlined } from '@ant-design/icons';
import { createAuthenticatedRequest } from "../../../provider/api";
import { getCachedUser } from "../../../utils/getCachedUser";

const { TextArea } = Input;

interface Todo {
    id: string;
    prompt_category: string;
    body: string;
}

interface TrainingDrawerProps {
    visible: boolean;
    onClose: () => void;
}

export const TrainingDrawer: React.FC<TrainingDrawerProps> = ({ visible, onClose }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [editForm] = Form.useForm();

    const { token } = theme.useToken();
    const user = getCachedUser();

    const handleAddTodo = async () => {
        try {
            setIsLoading(true); // Start loading
            const newTodo = editForm.getFieldsValue();
            console.log(newTodo);

            if (newTodo.prompt_category.trim() && newTodo.body.trim()) {
                const toDomainTraining = {
                    id: uuidv4(),
                    ...newTodo
                };

                console.log(toDomainTraining);

                // Attempt to update chatbot information
               await chatbotApi.putChatbotTechnicalInformation(user?.id, toDomainTraining);

                // Add the new todo to the state
                setTodos([...todos, { ...newTodo, id: uuidv4() }]);

                // Clear form fields
                editForm.resetFields();

                // Hide form after adding
                setIsFormVisible(false);
            }
        } catch (error) {
            console.error("Failed to add training:", error);
            // Optionally, you can add additional error handling here, like displaying a notification or alert
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleEditTodo = (todo: Todo) => {
        setEditingTodoId(todo.id);
        editForm.setFieldsValue({ prompt_category: todo.prompt_category, body: todo.body });
        setIsFormVisible(true);
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleShowForm = () => {
        setIsFormVisible(true);
        editForm.resetFields(); // Clear form fields if adding a new todo
    };

    const handleHideForm = () => {
        setIsFormVisible(false);
        setEditingTodoId(null);
        editForm.resetFields(); // Clear form fields
    };

    const { chatbotApi } = createAuthenticatedRequest();
    const currentUser = getCachedUser();

    useEffect(() => {
        const fetchTodo = async () => {
            console.log("fetching training")
            const response = await chatbotApi.getAllUserPromptId(currentUser?.id);
        };
        fetchTodo();
    }, [todos]);

    return (
        <Drawer
            title="Model Training"
            placement="right"
            onClose={onClose}
            open={visible}
            width={650}
            bodyStyle={{ padding: '20px' }}
        >
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: "1px solid #DDDDDD", borderRadius: "10px" }}>
                <List
                    dataSource={todos}
                    renderItem={(todo, idx) => (
                        <List.Item
                            style={{
                                marginBottom: '10px',
                                padding: '10px',
                            }}
                            actions={[
                                <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={<span style={{ color: token?.colorPrimary }}>{`${idx + 1} - ${todo.prompt_category}`}</span>}
                                description={todo.body}
                            />
                        </List.Item>
                    )}
                    locale={{
                        emptyText: (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0px 0px 20px 0px",
                                    }}
                                >
                                    <RobotOutlined
                                        style={{
                                            fontSize: "24px",
                                            marginRight: "8px",
                                            color: token.colorPrimary,
                                        }}
                                    />
                                    <Typography.Text style={{ color: token.colorTextTertiary }}>
                                        Start a new training
                                    </Typography.Text>
                                </div>
                            </div>
                        ),
                    }}
                />
            </div>

            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleShowForm}
                style={{ marginTop: '20px', width: '100%', color: token?.colorPrimary }}
            >
                Add New Training
            </Button>

            {isFormVisible && (
                <Card
                    style={{ marginTop: '20px', border: '1px solid #d9d9d9', borderRadius: '8px', color: token?.colorPrimary }}
                    title={<Typography.Title level={4} style={{ color: token?.colorPrimary }}>Add New Training</Typography.Title>}
                    extra={<Button onClick={handleHideForm}>Cancel</Button>}
                >
                    <Form form={editForm} layout="vertical">
                        <Form.Item name="prompt_category" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please enter a body' }]}>
                            <TextArea rows={4} placeholder="Body" />
                        </Form.Item>
                        <Button type="primary" onClick={handleAddTodo} loading={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Training'}
                        </Button>
                    </Form>
                </Card>
            )}
        </Drawer>
    );
};