import { Form, Input, Button, Spin, Select, Modal, notification } from "antd";
import {useEffect, useState} from "react";
import { useStyles } from "./styled";
import { useGo, useTranslate } from "@refinedev/core";
import {createAuthenticatedRequest} from "../../../provider/api";

type Props = {
    id?: string;
    action: "create" | "edit";
    onClose?: () => void;
    onMutationSuccess?: () => void;
    onUserUpdate?: (user: any) => void;
    isModalOpen?: boolean;
    user?: any; // Add user prop
};

const { userApi } = createAuthenticatedRequest();

export const ProfileModalForm = (props: Props) => {
    const { styles } = useStyles();
    const go = useGo();
    const t = useTranslate();

    const [form] = Form.useForm();
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        if (props.user) {
            form.setFieldsValue(props.user); // Set form values when user data is available
        }
    }, [props.user, form]);

    const handleSubmit = async (values: any) => {
        setFormLoading(true);
        const toDomainValues = {
            ...props?.user,
            ...values
        }
        try {
            const userId = props.id || "";
            const updatedUser = await userApi.crupdateUserById(userId, toDomainValues);

            // Update the user on ProfilePageHeader
            props.onUserUpdate?.(updatedUser?.data);

            notification.success({
                message: t("notifications.success"),
                description: t("users.notifications.updateSuccess"),
            });
            props.onMutationSuccess?.();
            go({
                to: "/profile",
                type: "replace",
            });
            props.onClose?.();
        } catch (error) {
            notification.error({
                message: t("notifications.error"),
                description: t("users.notifications.updateError"),
            });
        } finally {
            setFormLoading(false);
        }
    };

    const onModalClose = () => {
        props.onClose?.();
        form.resetFields(); // Reset form fields when the modal is closed
    };

    const title = props.action === "edit" ? t("users.actions.edit") : t("users.actions.add");

    return (
        <Modal
            open={props.isModalOpen}
            title={title}
            onCancel={onModalClose}
            footer={null}
        >
            <Spin spinning={formLoading}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label={t("users.fields.firstName")}
                        name="first_name"
                        className={styles.formItem}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("users.fields.lastName")}
                        name="last_name"
                        className={styles.formItem}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("users.fields.sex")}
                        name="sex"
                        className={styles.formItem}
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="F">F</Select.Option>
                            <Select.Option value="OTHER">OTHER</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button onClick={onModalClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};