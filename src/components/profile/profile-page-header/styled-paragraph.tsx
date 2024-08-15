import { Typography } from 'antd';
import styled from "@emotion/styled";

const { Paragraph } = Typography;

export const StyledParagraph = styled(Paragraph)`
    &.ant-typography-copyable {
        color: gray !important;

        .ant-typography-copyable-icon {
            color: gray !important;
        }

        &:hover {
            color: black !important;
        }
    }
`;