import { SaveButton, useDrawerForm } from "@refinedev/antd";
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
import type {IUser, IXxxxxx} from "../../../interfaces";
import { useSearchParams } from "react-router-dom";
import { Drawer } from "../../drawer";
import { useStyles } from "./styled";
import { useSelect } from "@refinedev/antd";

type Props = {
  id?: BaseKey;
  action: "create" | "edit";
  onClose?: () => void;
  onMutationSuccess?: () => void;
};

export const XxxxxxDrawerForm = (props: Props) => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { styles, theme } = useStyles();

  const { drawerProps, formProps, close, saveButtonProps, formLoading } =
    useDrawerForm<IXxxxxx>({
      resource: "xxxxxxs",
      id: props?.id, // when undefined, id will be read from the URL.
      action: props.action,
      redirect: false,
      onMutationSuccess: () => {
        props.onMutationSuccess?.();
      },
    });

  const { selectProps: userSelectProps } = useSelect<IUser>({
    resource: "users",
    pagination: {
      current: 1,
      pageSize: 100,
    },
    optionLabel: "first_name",
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

  const title = props.action === "edit" ? null : t("users.actions.add");

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
            layout="vertical"
            onFinish={(values) => {
              const toDomainValues = {
                ...formProps.initialValues,
                ...values
              };
              console.log('toDomainValues');
              console.log(toDomainValues);
              formProps?.onFinish(toDomainValues);
            }}
        >
          <Flex vertical>
            <Form.Item
              label={t("date.creation_datetime")}
              name="creation_datetime"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("date.updated_at")}
              name="updated_at"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label={t("users.fields.firstName")}
                name={["user", "id"]}
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                  },
                ]}
            >
              <Select {...userSelectProps} />
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
