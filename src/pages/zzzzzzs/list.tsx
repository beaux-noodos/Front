import {useGo, useNavigation, useTranslate} from "@refinedev/core";
import {CreateButton, List} from "@refinedev/antd";
import {type PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import {ZzzzzzListTable} from "../../components/zzzzzz/zzzzzz-list-table";

export const ZzzzzzList = ({children}: PropsWithChildren) => {
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
                            to: `${createUrl("zzzzzzs")}`,
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
                    {t("zzzzzzs.actions.add")}
                </CreateButton>,
            ]}
        >
            <ZzzzzzListTable />
            {children}
        </List>
    );
};
