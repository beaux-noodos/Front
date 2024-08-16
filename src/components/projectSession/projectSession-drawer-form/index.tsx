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
    Spin, Select,
} from "antd";
import type {IYyyyyy} from "../../../interfaces";
import {useSearchParams} from "react-router-dom";
import {Drawer} from "../../drawer";
import {useStyles} from "./styled";
import {v4 as uuidv4} from 'uuid';

type Props = {
    id?: BaseKey;
    action: "create" | "edit";
    onClose?: () => void;
    onMutationSuccess?: () => void;
};

export const ProjectSessionDrawerForm = (props: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const breakpoint = Grid.useBreakpoint();
    const {styles, theme} = useStyles();

    const {drawerProps, formProps, close, saveButtonProps, formLoading} =
        useDrawerForm<IYyyyyy>({
            resource: "yyyyyys",
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

    const generateDomainValues = (values: any, action: "create" | "edit") => {
        if (action !== "edit") {
            return {
                ...values,
                id: uuidv4(),
            };
        }
        return values;
    };


    const title = props.action === "edit" ? null : t("yyyyyys.actions.add");

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

                        console.log('Form submitted');
                        const toDomainValues = generateDomainValues(
                            {
                                ...formProps.initialValues,
                                ...values,
                            },
                            props.action
                        );
                        formProps?.onFinish(toDomainValues);
                    }}
                >
                    <Flex vertical>
                        <Form.Item
                            label={t("date.creation_datetime")}
                            name="creation_datetime"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={t("date.updated_at")}
                            name="updated_at"
                            className={styles.formItem}
                            rules={[]}
                        >
                            <Input/>
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
