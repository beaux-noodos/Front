import {useGo, useNavigation, useTranslate} from "@refinedev/core";
import {CreateButton, List} from "@refinedev/antd";
import {type PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import {YyyyyyListTable} from "../../components/yyyyyy/yyyyyy-list-table";

export const YyyyyyList = ({children}: PropsWithChildren) => {
    const go = useGo();
    const {pathname} = useLocation();
    const {createUrl} = useNavigation();
    const t = useTranslate();

    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => {
                        return go({
                            to: `${createUrl("yyyyyys")}`,
                            query: {
                                to: pathname,
                            },
                            options: {
                                keepQuery: true,
                            },
                            type: "replace",
                        });
                    }}
                >
                    {t("yyyyyys.actions.add")}
                </CreateButton>,
            ]}
        >
            <YyyyyyListTable />
            {children}
        </List>
    );
};
