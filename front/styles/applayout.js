import { Menu } from 'antd';
import styled from 'styled-components';

// style을 컴포넌트 쓰기 싫으면 useMome 사용가능
export const AppWrapper = styled.div`
  background-color: rgb(250, 250, 250);
`;

export const MenuWrapper = styled(Menu)`
  width: 100%;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ContentLeft = styled.div`
  width: 45%;
  margin-right: 20px;
`;

export const ContentRight = styled.div`
  width: 20%;
  margin-top: 10px;
`;
