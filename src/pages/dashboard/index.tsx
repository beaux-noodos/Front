import {PropsWithChildren, useState} from "react";
import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { CreateButton, List } from "@refinedev/antd";
import { BlogListCard } from "../../components/blog/blog-list-card";
import {ProjectModalForm} from "../../components/blog/project-creation-modal";

export const DashboardPage = ({ children }: PropsWithChildren) => {
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const t = useTranslate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <List
                breadcrumb={false}
                headerButtons={(props) => [
                    <CreateButton
                        {...props.createButtonProps}
                        key="create"
                        size="large"
                        onClick={showModal} // Show modal on button click
                    >
                        {t("project.actions.add")}
                    </CreateButton>,
                ]}
            >
                <BlogListCard />
                {children}
            </List>

            {/* Render the modal based on state */}
            {isModalVisible && (
                <ProjectModalForm
                    action="create"
                    onClose={handleModalClose} // Pass the close handler
                    onMutationSuccess={() => {
                        handleModalClose();
                        // Optionally, add any logic to handle after mutation success
                    }}
                    isModalVisible={isModalVisible}
                />
            )}
        </>
    );
};