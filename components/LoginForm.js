import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Link from 'next/Link';
import styled from 'styled-components';
import useInput from './hooks/useInput';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLogged }) => {
  // 커스텀 훅 - const [id, setId] = useState('');
  // const [id, setId] = useState('');
  // const [password, setPassword] = useState('');
  const [id, onChangeId] = useInput('');
  const [password, onChangePassWord] = useInput('');

  // const onChangeId = (e) =>{
  //   setId(e.target.value);
  // }

  // const onChangePassWord = (e) =>{
  //   setPassword(e.target.value);
  // }

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
          <Input name="user-id" value={ id } onChange={ onChangeId }></Input>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" 
                type="password"
                value={ password } 
                onChange={ onChangePassWord }
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

LoginForm.proptypes = {
  setIsLogged: PropTypes.func.isRequired,
};
  
export default LoginForm;