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
import type {ILocation} from "../../../interfaces";
import { useSearchParams } from "react-router-dom";
import { Drawer } from "../../drawer";
import { useStyles } from "./styled";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  id?: BaseKey;
  action: "create" | "edit";
  onClose?: () => void;
  onMutationSuccess?: () => void;
};

export const LocationDrawerForm = (props: Props) => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { styles, theme } = useStyles();

  const { drawerProps, formProps, close, saveButtonProps, formLoading } =
    useDrawerForm<ILocation>({
      resource: "locations",
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


  const title = props.action === "edit" ? null : t("locations.actions.add");

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
              // Merge initial form values with the submitted ones and generate a UUID if needed
              const toDomainValues = generateDomainValues(
                  {
                    ...formProps.initialValues,
                    ...values,
                  },
                  props.action
              );
              formProps?.onFinish(toDomainValues); // Trigger the final submission
            }}
        >
          <Flex vertical>
            <Form.Item
              label={t("date.creation_datetime")}
              name="creation_datetime"
              className={styles.formItem}
              rules={[]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("date.updated_at")}
              name="updated_at"
              className={styles.formItem}
              rules={[]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("location.name")}
              name="name"
              className={styles.formItem}
              rules={[{ required: true, message: t("validation.required", { field: t("location.name") }) }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("location.description")}
              name="description"
              className={styles.formItem}
              rules={[{ required: true, message: t("validation.required", { field: t("location.description") }) }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("location.latitude")}
              name="latitude"
              className={styles.formItem}
              rules={[{ required: true, message: t("validation.required", { field: t("location.latitude") }) }]}
            >
              <Input type="number" step="any" />
            </Form.Item>

            <Form.Item
              label={t("location.longitude")}
              name="longitude"
              className={styles.formItem}
              rules={[{ required: true, message: t("validation.required", { field: t("location.longitude") }) }]}
            >
              <Input type="number" step="any" />
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
