import {List} from "@refinedev/antd";
import {type PropsWithChildren} from "react";
import {ProfilePageContent, ProfilePageHeader} from "../../components/profile/";
import {ProfilePageEvent} from "../../components/profile/profile-page-event";

export const ProfilePage = ({children}: PropsWithChildren) => {

    return (
        <>
            <ProfilePageHeader/>
            <List
                breadcrumb={false}
            >
                <ProfilePageContent/>
                <ProfilePageEvent/>
                {children}
            </List>
        </>
    );
};
