import {
    useTranslate,
} from "@refinedev/core";
import {
    Button,
    Flex, theme,
} from "antd";
import type {ILocation} from "../../../interfaces";
import {DeleteButton} from "@refinedev/antd";
import {EditOutlined} from "@ant-design/icons";

type Props = {
    location: ILocation,
    handleDrawerClose: () => void
    handleDrawerEdit: () => void
};

export const LocationButtonAction = (props: Props) => {
    const {location, handleDrawerClose, handleDrawerEdit} = props;
    const {token} = theme.useToken();
    const t = useTranslate();

    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: "16px 34px",
                backgroundColor: "#FFFFFF"
            }}
        >
            <Button onClick={handleDrawerClose}>Cancel</Button>
            <DeleteButton
                type="primary"
                recordItemId={location?.id}
                resource="locations"
                onSuccess={() => {
                    handleDrawerClose();
                }}
            />
            <Button
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<EditOutlined />}
                type="primary"
                onClick={() => {
                    handleDrawerEdit();
                }}
            >
                {t("actions.edit")}
            </Button>
        </Flex>
    );
};