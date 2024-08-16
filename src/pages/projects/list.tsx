import {useGo, useNavigation, useTranslate} from "@refinedev/core";
import {CreateButton, List} from "@refinedev/antd";
import {type PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import {ProjectListTable} from "../../components/project/project-list-table";

export const ProjectList = ({children}: PropsWithChildren) => {
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
                            to: `${createUrl("projects")}`,
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
                    {t("projects.actions.add")}
                </CreateButton>,
            ]}
        >
            <ProjectListTable />
            {children}
        </List>
    );
};
