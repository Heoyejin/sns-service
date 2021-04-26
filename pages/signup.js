import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Checkbox, Form, Input, Button } from 'antd';
import useInput from '../components/hooks/useInput';
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: 'red'
`;

const SignUp = () => {
  const [id, onChangeId] = useInput('');
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
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>    
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId}></Input>
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
          <Button type="primary" htmlType="submit">가입</Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export default SignUp;