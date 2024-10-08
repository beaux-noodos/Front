import {SaveButton, useDrawerForm} from "@refinedev/antd";
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
    Grid,
    Button,
    Flex,
    Spin,
    DatePicker,
    Upload,
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {IProject} from "../../../interfaces";
import {useSearchParams} from "react-router-dom";
import {Drawer} from "../../drawer";
import {useStyles} from "./styled";
import {v4 as uuidv4} from "uuid";
import {getCachedUser} from "../../../utils/getCachedUser";
import type {UploadFile} from "antd/es/upload/interface";

type Props = {
    id?: BaseKey;
    action: "create" | "edit";
    onClose?: () => void;
    onMutationSuccess?: () => void;
};

export const ProjectDrawerForm = (props: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const breakpoint = Grid.useBreakpoint();
    const {styles, theme} = useStyles();

    const {drawerProps, formProps, close, saveButtonProps, formLoading} =
        useDrawerForm<IProject>({
            resource: "projects",
            id: props?.id, // when undefined, id will be read from the URL.
            action: props.action,
            redirect: false,
            onMutationSuccess: () => {
                props.onMutationSuccess?.();
            },
        });

    const onDrawerCLose = () => {
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

    // l'utilisateur à envoyer vers la requete pour la création du projet est l'user qui est connecté

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
        <Drawer
            {...drawerProps}
            open={true}
            title={title}
            width={breakpoint.sm ? "378px" : "100%"}
            zIndex={1001}
            onClose={onDrawerCLose}
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

                        const toDomainValues = generateDomainValues(
                            {
                                ...formProps.initialValues,
                                ...values,
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
                            <Input/>
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
                                <Button icon={<UploadOutlined/>}>
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
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={"Price"}
                            name="price"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input/>
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
                                style={{width: "100%"}}
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
                                style={{width: "100%"}}
                            />
                        </Form.Item>

                        <Flex
                            align="center"
                            justify="space-between"
                            style={{
                                padding: "16px 16px 0px 16px",
                            }}
                        >
                            <Button onClick={onDrawerCLose}>Cancel</Button>
                            <SaveButton
                                {...saveButtonProps}
                                htmlType="submit"
                                type="primary"
                                icon={null}
                            >
                                Save
                            </SaveButton>
                        </Flex>
                    </Flex>
                </Form>
            </Spin>
        </Drawer>
    );
};
