import {useState, useEffect} from "react";
import {
    useGetLocale,
    useSetLocale,
    useGetIdentity,
    useTranslate,
    useList,
} from "@refinedev/core";
import {Link} from "react-router-dom";
import {SearchOutlined, DownOutlined} from "@ant-design/icons";

import {
    Dropdown,
    Input,
    Avatar,
    Typography,
    Space,
    Grid,
    Row,
    Col,
    AutoComplete,
    Layout as AntdLayout,
    Button,
    theme,
    type MenuProps,
} from "antd";

import {useTranslation} from "react-i18next";
import debounce from "lodash/debounce";

import {useConfigProvider} from "../../context";
import {IconMoon, IconSun} from "../../components/icons";
import type {IOrder, IStore, ICourier, IIdentity} from "../../interfaces";
import {useStyles} from "./styled";
import {getCachedUser} from "../../utils/getCachedUser";

const {Header: AntdHeader} = AntdLayout;
const {useToken} = theme;
const {Text} = Typography;
const {useBreakpoint} = Grid;

interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}

export const Header: React.FC = () => {
    const {token} = useToken();
    const {styles} = useStyles();
    const {mode, setMode} = useConfigProvider();
    const {i18n} = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const screens = useBreakpoint();
    const t = useTranslate();

    const currentLocale = locale();

    const user = getCachedUser();

    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);


    useEffect(() => {
        setOptions([]);
    }, [value]);

    const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
        .sort()
        .map((lang: string) => ({
            key: lang,
            onClick: () => changeLanguage(lang),
            icon: (
                <span style={{marginRight: 8}}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`}/>
        </span>
            ),
            label: lang === "en" ? "English" : "German",
        }));

    return (
        <AntdHeader
            style={{
                backgroundColor: token.colorBgElevated,
                padding: "0 24px",
            }}
        >
            <Row
                align="middle"
                style={{
                    justifyContent: screens.sm ? "space-between" : "end",
                }}
            >
                <Col xs={0} sm={8} md={12}>
                    <AutoComplete
                        style={{
                            width: "100%",
                            maxWidth: "550px",
                        }}
                        options={options}
                        filterOption={false}
                        onSearch={debounce((value: string) => setValue(value), 300)}
                    >
                        <Input
                            size="large"
                            placeholder={t("search.placeholder")}
                            suffix={<div className={styles.inputSuffix}>/</div>}
                            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                            prefix={<SearchOutlined className={styles.inputPrefix}/>}
                        />
                    </AutoComplete>
                </Col>
                <Col>
                    <Space size={screens.md ? 32 : 16} align="center">
                        <Dropdown
                            menu={{
                                items: menuItems,
                                selectedKeys: currentLocale ? [currentLocale] : [],
                            }}
                        >
                            <Button onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Text className={styles.languageSwitchText}>
                                        {currentLocale === "en" ? "English" : "German"}
                                    </Text>
                                    {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
                                    <DownOutlined className={styles.languageSwitchIcon}/>
                                </Space>
                            </Button>
                        </Dropdown>

                        <Button
                            className={styles.themeSwitch}
                            type="text"
                            icon={mode === "light" ? <IconMoon/> : <IconSun/>}
                            onClick={() => {
                                setMode(mode === "light" ? "dark" : "light");
                            }}
                        />

                        <Link to={`/profile`}>
                            <Space size={screens.md ? 16 : 8} align="center">
                                <Text ellipsis className={styles.userName}>
                                    {user?.first_name}
                                </Text>
                                <Avatar size="large" src={user?.avatar} alt={user?.name}/>
                            </Space>
                        </Link>
                    </Space>
                </Col>
            </Row>
        </AntdHeader>
    );
};
