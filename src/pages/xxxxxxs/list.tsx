import {useGo, useNavigation, useTranslate} from "@refinedev/core";
import {CreateButton, List} from "@refinedev/antd";
import {XxxxxxListTable} from "../../components";
import {type PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";

export const XxxxxxList = ({children}: PropsWithChildren) => {
    const go = useGo();
    const {pathname} = useLocation();
    const {createUrl} = useNavigation();
    const t = useTranslate();

    return (
        <List
            breadcrumb={false}
        >
            <XxxxxxListTable />
            {children}
        </List>
    );
};
