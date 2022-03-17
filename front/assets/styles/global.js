import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'antd';

export const AlignRightButton = styled(Button)`
  float: right;
`;

export const TabAlignCenter = createGlobalStyle`
  .ant-tabs-nav-wrap {
    margin-top: 10px;
  }
  .ant-list-bordered {
    margin-bottom: 20px;
  }
`