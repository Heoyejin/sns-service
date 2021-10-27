import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from './hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassWord] = useInput('');
  const { logInLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({email, password}));
  }, [email, password]);

  return (
    <>
      <FormWrapper onFinish={ onSubmitForm }>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" value={ email } onChange={ onChangeEmail }></Input>
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
          <Button type="primary" htmlType="submit" loading={ logInLoading }>로그인</Button>
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