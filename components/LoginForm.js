import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/Link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLogged }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  
  const onChangePassWord = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback((e) => {
    console.log(id, password);
    setIsLogged(true);
  }, []);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={ onChangeId }></Input>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" 
                type="password"
                value={password} 
                onChange={onChangePassWord}
                required>      
          </Input>
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
          <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  )
}
  
export default LoginForm;