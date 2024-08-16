import {DevtoolsProvider, DevtoolsPanel} from "@refinedev/devtools";
import React from "react";
import {Authenticated, Refine} from "@refinedev/core";
import {RefineKbarProvider} from "@refinedev/kbar";
import {
    useNotificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import {
    ShoppingOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import {authProvider} from "./authProvider";

import "dayjs/locale/de";

import {DashboardPage} from "./pages/dashboard";
import {AuthPage} from "./pages/auth";
import {useTranslation} from "react-i18next";
import {Header, Title} from "./components";
import {ConfigProvider} from "./context";
import {useAutoLoginForDemo} from "./hooks";

import "@refinedev/antd/dist/reset.css";
import {UserCreate, UserEdit, UserList, UserShow} from "./pages/users";
import {
    ProjectCreate,
    ProjectEdit,
    ProjectList,
    ProjectShow
} from "./pages/projects";
import {dataProvider} from "./provider/dataProvider/dataProvider";
import {ZzzzzzCreate, ZzzzzzEdit, ZzzzzzList, ZzzzzzShow} from "./pages/zzzzzzs";
import {ProjectSessionCreate, ProjectSessionEdit, ProjectSessionList, ProjectSessionShow} from "./pages/projectSessions";
import {ChatProvider} from "./context/chatBotProvider";
import {ChatbotComponent} from "./components/chatBot/chatBotComponent";
import {ProfilePage} from "./pages/profile";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    const {loading} = useAutoLoginForDemo();

    const {t, i18n} = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    if (loading) {
        return null;
    }

    return (
        (<BrowserRouter>
                <ConfigProvider>
                    <RefineKbarProvider>
                        <DevtoolsProvider>
                            <ChatProvider>
                                <Refine
                                    routerProvider={routerProvider}
                                    dataProvider={dataProvider}
                                    authProvider={authProvider}
                                    i18nProvider={i18nProvider}
                                    options={{
                                        syncWithLocation: true,
                                        warnWhenUnsavedChanges: true,
                                        projectId: "AaFTfP-brZ0go-a8xabA"
                                    }}
                                    notificationProvider={useNotificationProvider}
                                    resources={[
                                        {
                                            name: "dashboard",
                                            list:"/",
                                            meta: {
                                                label: "Home",
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <DashboardOutlined />,
                                            },
                                        },
                                        {
                                            name: "profile",
                                            meta: {
                                                label: "Profile",
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <DashboardOutlined />,
                                            },
                                        },
                                        {
                                            name: "users",
                                            list: "/users",
                                            show: "/users/:id",
                                            edit: "/users/:id/edit",
                                            meta: {
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <ShoppingOutlined/>,
                                            },
                                        },
                                        {
                                            name: "projects",
                                            list: "/projects",
                                            show: "/projects/:id",
                                            create: "/projects/new",
                                            edit: "/projects/:id/edit",
                                            meta: {
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <ShoppingOutlined/>,
                                            },
                                        },
                                        {
                                            name: "projectSessions",
                                            list: "/projectSessions",
                                            show: "/projectSessions/:id",
                                            create: "/projectSessions/new",
                                            edit: "/projectSessions/:id/edit",
                                            meta: {
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <ShoppingOutlined/>,
                                            },
                                        },
                                        {
                                            name: "zzzzzzs",
                                            list: "/zzzzzzs",
                                            show: "/zzzzzzs/:id",
                                            create: "/zzzzzzs/new",
                                            edit: "/zzzzzzs/:id/edit",
                                            meta: {
                                                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                                                icon: <ShoppingOutlined/>,
                                            },
                                        }
                                    ]}
                                >
                                    <Routes>
                                        <Route
                                            element={
                                                <Authenticated
                                                    key="authenticated-routes"
                                                    fallback={<CatchAllNavigate to="/login"/>}
                                                >
                                                    <ThemedLayoutV2 Header={Header} Title={Title}>
                                                        <div
                                                            style={{
                                                                maxWidth: "1200px",
                                                                marginLeft: "auto",
                                                                marginRight: "auto",
                                                            }}
                                                        >
                                                            <Outlet/>
                                                            <ChatbotComponent />
                                                        </div>
                                                    </ThemedLayoutV2>
                                                </Authenticated>
                                            }
                                        >
                                            <Route index element={<DashboardPage/>}/>

                                            <Route
                                                path="/projects"
                                                element={
                                                    <ProjectList>
                                                        <Outlet/>
                                                    </ProjectList>
                                                }
                                            >
                                                <Route path="new" element={<ProjectCreate/>}/>
                                                <Route path=":id" element={<ProjectShow/>}/>
                                                <Route path=":id/edit" element={<ProjectEdit/>}/>
                                            </Route>

                                            <Route
                                                path="/projectPossesions"
                                                element={
                                                    <ProjectSessionList>
                                                        <Outlet/>
                                                    </ProjectSessionList>
                                                }
                                            >
                                                <Route path="new" element={<ProjectSessionCreate/>}/>
                                                <Route path=":id" element={<ProjectSessionShow/>}/>
                                                <Route path=":id/edit" element={<ProjectSessionEdit/>}/>
                                            </Route>

                                            <Route
                                                path="/zzzzzzs"
                                                element={
                                                    <ZzzzzzList>
                                                        <Outlet/>
                                                    </ZzzzzzList>
                                                }
                                            >
                                                <Route path="new" element={<ZzzzzzCreate/>}/>
                                                <Route path=":id" element={<ZzzzzzShow/>}/>
                                                <Route path=":id/edit" element={<ZzzzzzEdit/>}/>
                                            </Route>

                                            <Route
                                                path="/users"
                                                element={
                                                    <UserList>
                                                        <Outlet/>
                                                    </UserList>
                                                }
                                            >
                                                <Route path="new" element={<UserCreate/>}/>
                                                <Route path=":id" element={<UserShow/>}/>
                                                <Route path=":id/edit" element={<UserEdit/>}/>
                                            </Route>

                                            <Route path="/profile" element={<ProfilePage/>}/>

                                        </Route>

                                        <Route
                                            element={
                                                <Authenticated key="auth-pages" fallback={<Outlet/>}>
                                                    <NavigateToResource resource="dashboard"/>
                                                </Authenticated>
                                            }
                                        >
                                            <Route
                                                path="/login"
                                                element={
                                                    <AuthPage
                                                        type="login"
                                                        formProps={{
                                                            initialValues: {
                                                                email: "",
                                                                password: "",
                                                            },
                                                        }}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/register"
                                                element={
                                                    <AuthPage
                                                        type="register"
                                                        formProps={{
                                                            initialValues: {
                                                                email: "manager1@gmail.com",
                                                                password: "demodemo",
                                                            },
                                                        }}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/forgot-password"
                                                element={<AuthPage type="forgotPassword"/>}
                                            />
                                            <Route
                                                path="/update-password"
                                                element={<AuthPage type="updatePassword"/>}
                                            />
                                        </Route>

                                        <Route
                                            element={
                                                <Authenticated key="catch-all">
                                                    <ThemedLayoutV2 Header={Header} Title={Title}>
                                                        <Outlet/>
                                                    </ThemedLayoutV2>
                                                </Authenticated>
                                            }
                                        >
                                            <Route path="*" element={<ErrorComponent/>}/>
                                        </Route>
                                    </Routes>
                                    <UnsavedChangesNotifier/>
                                    <DocumentTitleHandler/>
                                </Refine>
                            </ChatProvider>
                            <DevtoolsPanel/>
                        </DevtoolsProvider>
                    </RefineKbarProvider>
                </ConfigProvider>
            </BrowserRouter>
        )
    );
};

export default App;
