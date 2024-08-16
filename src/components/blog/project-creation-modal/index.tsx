import { SaveButton, useModalForm } from "@refinedev/antd";
import {
    type BaseKey,
    useApiUrl,
    useGetToPath,
    useGo,
    useTranslate,
} from "@refinedev/core";
import {
    Form,
    Input,
    Button,
    Flex,
    Spin,
    DatePicker,
    Upload,
    Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { IProject } from "../../../interfaces";
import { useSearchParams } from "react-router-dom";
import { useStyles } from "./styled";
import { v4 as uuidv4 } from "uuid";
import { getCachedUser } from "../../../utils/getCachedUser";
import dayjs from "dayjs";

type Props = {
    id?: BaseKey;
    action: "create" | "edit";
    onClose?: () => void;
    onMutationSuccess?: () => void;
    isModalVisible?: boolean;
};

export const ProjectModalForm = (props: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const { styles } = useStyles();

    const { modalProps, formProps, close, saveButtonProps, formLoading } =
        useModalForm<IProject>({
            resource: "projects",
            id: props?.id, // when undefined, id will be read from the URL.
            action: props.action,
            redirect: false,
            onMutationSuccess: () => {
                props.onMutationSuccess?.();
            },
        });

    const onModalClose = () => {
        close();

        if (props?.onClose) {
            props.onClose();
            return;
        }

        go({
            to:
                searchParams.get("to") ??
                getToPath({
                    action: "list",
                }) ??
                "",
            query: {
                to: undefined,
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    };

    const actualUser = getCachedUser();

    const generateDomainValues = (values: any, action: "create" | "edit") => {
        if (action !== "edit") {
            return {
                ...values,
                user: actualUser,
                status: "PLANNING",
                id: uuidv4(),
            };
        }
        return {
            ...values,
        };
    };

    const title = props.action === "edit" ? null : t("projects.actions.add");

    return (
        <Modal
            {...modalProps}
            title={title}
            open={props?.isModalVisible}
            onCancel={onModalClose}
            centered={true}
            footer={[
                <Button key="cancel" onClick={onModalClose}>
                    Cancel
                </Button>,
                <SaveButton
                    {...saveButtonProps}
                    key="save"
                    htmlType="submit"
                    type="primary"
                >
                    Save
                </SaveButton>,
            ]}
            width={600} // Adjust the width as needed
        >
            <Spin spinning={formLoading}>
                <Form
                    {...formProps}
                    form={formProps.form}
                    layout="vertical"
                    onFinish={(values) => {
                        // Prevent any default form submission behavior (just in case)
                        if (window.event) {
                            window.event.preventDefault();
                        }

                        const formattedValues = {
                            ...values,
                            start_datetime: dayjs(values.start_datetime).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            end_datetime: dayjs(values.end_datetime).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                        };

                        const toDomainValues = generateDomainValues(
                            {
                                ...formProps.initialValues,
                                ...formattedValues,
                            },
                            props.action
                        );

                        console.log(toDomainValues);
                        formProps?.onFinish(toDomainValues);
                    }}
                >
                    <Flex vertical>
                        <Form.Item
                            label={"Title"}
                            name="title"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Image URL"}
                            name="image_url"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Upload
                                name="image"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false} // Prevent automatic upload
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label={"Description"}
                            name="description"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Price"}
                            name="price"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Start Date and Time"}
                            name="start_datetime"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DDTHH:mm:ssZ"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={"End Date and Time"}
                            name="end_datetime"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DDTHH:mm:ssZ"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Flex>
                </Form>
            </Spin>
        </Modal>
    );
};