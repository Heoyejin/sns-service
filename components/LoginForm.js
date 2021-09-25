import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Link from 'next/Link';
import styled from 'styled-components';
import useInput from './hooks/useInput';
import { loginAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassWord] = useInput('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({id, password}));
  }, [id, password]);

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