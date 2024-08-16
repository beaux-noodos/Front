import {useGo, useNavigation, useTranslate} from "@refinedev/core";
import {CreateButton, List} from "@refinedev/antd";
import {type PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import {ProjectionSessionListTable} from "../../components/projectSession/projectSession-list-table";

export const ProjectSessionList = ({children}: PropsWithChildren) => {
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
            <ProjectionSessionListTable />
            {children}
        </List>
    );
};
