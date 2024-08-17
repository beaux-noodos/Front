import { AuthPage as AntdAuthPage, type AuthProps } from "@refinedev/antd";
import {Flex, Space} from "antd";
import { Link } from "react-router-dom";
import { FinefoodsLogoIcon, FinefoodsLogoText } from "../../components";

const authWrapperProps = {
  style: {
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: 408,
        margin: "auto",
      }}
    >
      <Link to="/">
        <Flex
          align="center"
          justify="center"
          gap={12}
          style={{
            marginBottom: 16,
          }}
        >
            <Space size={12}>
                <img src="/images/edustage.png" alt="Edustage Logo" style={{width: '90px', height: '90px'}}/>
            </Space>
        </Flex>
      </Link>
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      formProps={formProps}
    />
  );
};
