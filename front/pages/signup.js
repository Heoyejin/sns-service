import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import AccountLayout from '../components/AccountLayout';
import useInput from '../components/hooks/useInput';
import { Form, Input, Button, Checkbox } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';

import styles from '../assets/styles/component/accountForm.module.css';

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
      <Form className={styles.form} onFinish={onSubmit}>
        <div>
          <Input className={styles.input} name="user-email" value={email} placeholder="이메일" required onChange={onChangeEmail}></Input>
          <Input className={styles.input} name="user-nickname" value={nickname} placeholder="닉네임" required onChange={onChangeNickname}></Input>
          <Input className={styles.input} type="password" name="user-password" placeholder="비밀번호" value={password} required onChange={onChangePassword}></Input>
          <Input className={styles.input} type="password" name="user-password" placeholder="비밀번호 확인" value={passwordCheck} required onChange={onChangePassWordCheck}></Input>
          {passwordError && <div className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의하시겠습니까?</Checkbox>
          {termError && <div className={styles.errorMessage}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div>
          <Button className={styles.button} type="primary" htmlType="submit" loading={ signUpLoaging }>가입</Button>
        </div>
      </Form>
    </AccountLayout>
  )
}

export default SignUp;