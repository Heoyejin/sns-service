import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Link from 'next/link';
import AccountLayout from './AccountLayout';
import { FormWrapper, ButtonWrapper, InputWrapper, BoldLink, Hr } from '../styles/account';
import useInput from './hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassWord] = useInput('');
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({email, password}));
  }, [email, password]);

  return (
    <>
      <AccountLayout>
        <FormWrapper onFinish={ onSubmitForm }>
          <div>
            <InputWrapper name="user-email" value={ email } placeholder="이메일" onChange={ onChangeEmail }></InputWrapper>
            <InputWrapper name="user-password"
                type="password"
                value={ password }
                placeholder="비밀번호"
                onChange={ onChangePassWord }
                required>
            </InputWrapper>
            <ButtonWrapper type="primary" htmlType="submit" loading={ logInLoading }>로그인</ButtonWrapper>
          </div>
          <Hr/>
          <div style={{ textAlign: 'center' }}>
            <Link href="/signup"><BoldLink>회원가입</BoldLink></Link>
          </div>
        </FormWrapper>
      </AccountLayout>
    </>
  )
}

LoginForm.proptypes = {
  setIsLogged: PropTypes.func.isRequired,
};
  
export default LoginForm;