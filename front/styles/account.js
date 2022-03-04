import styled from 'styled-components';
import { Form, Input, Button } from 'antd';


export const FormWrapper = styled(Form)`
  padding: 10px;
`;

export const ButtonWrapper = styled(Button)`
  width: 100%;
  margin-top: 5px;
`;


export const InputWrapper = styled(Input)`
  background-color: rgb(250, 250, 250);
  font-size: 12px;
  margin-bottom: 5px;
`;

export const Hr = styled.hr`
  border: solid 1px rgb(219, 219, 219);
  margin: 20px 0px 10px 0px;
`;

export const BoldLink = styled.a`
  font-weight: bold;
`;