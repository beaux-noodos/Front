import {useLink} from "@refinedev/core";
import {Space, theme} from "antd";

import {FinefoodsLogoIcon, FinefoodsLogoText} from "../../components";
import {Logo} from "./styled";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({collapsed}) => {
    const {token} = theme.useToken();
    const Link = useLink();

    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    <FinefoodsLogoIcon/>
                ) : (
                    <Space size={12}>
                        <img src="/images/edustage.png" alt="Edustage Logo" style={{width: '152px', height: '32px'}}/>
                    </Space>
                )}
            </Link>
        </Logo>
    );
};
