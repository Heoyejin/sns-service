import React, { useCallback, useState } from 'react';
import { Checkbox, Form, Input, Button } from 'antd';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import useInput from '../components/hooks/useInput';
import styled from 'styled-components'
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch } from 'react-redux';

const ErrorMessage = styled.div`
  color: 'red'
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpLoaging } = userSelector((state) => state.user);

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
    <AppLayout>    
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" value={email} required onChange={onChangeEmail}></Input>
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname}></Input>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" value={password} required onChange={onChangePassWordCheck}></Input>
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의하시겠습니까?</Checkbox>
          {termError && <div style={{ color: 'red'}}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{ marginTop: 10}}>
          <Button type="primary" htmlType="submit" loading={ signUpLoaging }>가입</Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export default SignUp;