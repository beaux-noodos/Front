import {
    type BaseKey,
    type HttpError,
    useGetToPath,
    useGo,
    useNavigation,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    Flex,
    Grid,
    theme,
} from "antd";
import {useSearchParams} from "react-router-dom";
import {Drawer} from "../../drawer";
import type {IUser} from "../../../interfaces";
import {UserInfoSummary} from "../user-info-summary";
import {UserInfoList} from "../user-infoList";
import {UserButtonAction} from "../user-button-action";

type Props = {
    id?: BaseKey;
    onClose?: () => void;
    onEdit?: () => void;
};

export const UserDrawerShow = (props: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const {editUrl} = useNavigation();
    const t = useTranslate();
    const {token} = theme.useToken();
    const breakpoint = Grid.useBreakpoint();

    const {queryResult} = useShow<IUser, HttpError>({
        resource: "users",
        id: props?.id, // when undefined, id will be read from the URL.
    });

    const user = queryResult.data?.data;

    const handleDrawerClose = () => {
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

    const handleDrawerEdit = () => {
        if (props?.onEdit) {
            return props.onEdit();
        }

        return go({
            to: `${editUrl("users", user?.id || "")}`,
            query: {
                to: "/users",
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    }

    return (
        <Drawer
            open={true}
            width={breakpoint.sm ? "378px" : "100%"}
            zIndex={1001}
            onClose={handleDrawerClose}
        >
            <Flex
                vertical
                gap={32}
                style={{
                    padding: "32px",
                }}
            >
                <UserInfoSummary user={user} />
                <UserInfoList user={user} />
            </Flex>
            <UserButtonAction user={user} handleDrawerClose={handleDrawerClose} handleDrawerEdit={handleDrawerEdit} />
        </Drawer>
    );
};