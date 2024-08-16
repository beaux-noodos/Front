import React, { useState } from 'react';
import {Drawer, List, Input, Form, Button, Card, theme, Typography} from 'antd';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface Todo {
    id: string;
    title: string;
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
    const [editForm] = Form.useForm();

    const { token } = theme.useToken();

    const handleAddTodo = () => {
        const newTodo = editForm.getFieldsValue();
        if (newTodo.title.trim() && newTodo.body.trim()) {
            setTodos([...todos, { ...newTodo, id: uuidv4() }]);
            editForm.resetFields(); // Clear form fields
            setIsFormVisible(false); // Hide form after adding
        }
    };

    const handleEditTodo = (todo: Todo) => {
        setEditingTodoId(todo.id);
        editForm.setFieldsValue({ title: todo.title, body: todo.body });
        setIsFormVisible(true);
    };

    const handleUpdateTodo = () => {
        const updatedTodo = editForm.getFieldsValue();
        setTodos(todos.map(todo =>
            todo.id === editingTodoId ? { ...todo, ...updatedTodo } : todo
        ));
        setEditingTodoId(null);
        editForm.resetFields(); // Clear form fields
        setIsFormVisible(false); // Hide form after updating
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
                                <Button icon={<EditOutlined />} onClick={() => handleEditTodo(todo)}>Edit</Button>,
                                <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={<span style={{ color: token?.colorPrimary }}>{`${idx + 1} - ${todo.title}`}</span>}
                                description={todo.body}
                            />
                        </List.Item>
                    )}
                />
            </div>

            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleShowForm}
                style={{ marginTop: '20px', width: '100%', color: token?.colorPrimary}}
            >
                Add New Training
            </Button>

            {isFormVisible && (
                <Card
                    style={{ marginTop: '20px', border: '1px solid #d9d9d9', borderRadius: '8px', color: token?.colorPrimary }}
                    title={editingTodoId ? <Typography.Title level={4} style={{color: token?.colorPrimary}}>Edit To-Do</Typography.Title> : <Typography.Title level={4} style={{color: token?.colorPrimary}}>Add New Training</Typography.Title>}
                    extra={<Button onClick={handleHideForm}>Cancel</Button>}
                >
                    <Form form={editForm} layout="vertical">
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please enter a body' }]}>
                            <TextArea rows={4} placeholder="Body" />
                        </Form.Item>
                        {editingTodoId ? (
                            <Button type="primary" onClick={handleUpdateTodo}>Update</Button>
                        ) : (
                            <Button type="primary" onClick={handleAddTodo}>Add Training</Button>
                        )}
                    </Form>
                </Card>
            )}
        </Drawer>
    );
};