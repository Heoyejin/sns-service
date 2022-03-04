import React, { useState, useEffect, useCallback } from 'react';
import useInput from '../components/hooks/useInput';

import { Checkbox } from 'antd';
import { FormWrapper, ButtonWrapper, InputWrapper } from '../styles/account';
import styled from 'styled-components';

import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AccountLayout from '../components/AccountLayout';

const ErrorMessage = styled.div`
  color: 'red'
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpLoaging, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/login');
    }
  }, [me]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  },[signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  },[signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePassWordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value != password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState('');
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password }
    });
  }, [password, passwordCheck, term]);

  return (
    <AccountLayout>
      <FormWrapper onFinish={onSubmit}>
        <div>
          <InputWrapper name="user-email" value={email} required onChange={onChangeEmail}></InputWrapper>
          <InputWrapper name="user-nickname" value={nickname} required onChange={onChangeNickname}></InputWrapper>
          <InputWrapper type={ password } name="user-nickname" value={password} required onChange={onChangePassword}></InputWrapper>
          <InputWrapper type={ password } name="user-password" value={passwordCheck} required onChange={onChangePassWordCheck}></InputWrapper>
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의하시겠습니까?</Checkbox>
          {termError && <div style={{ color: 'red'}}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{ marginTop: 10}}>
          <ButtonWrapper type="primary" htmlType="submit" loading={ signUpLoaging }>가입</ButtonWrapper>
        </div>
      </FormWrapper>
    </AccountLayout>
  )
}

export default SignUp;