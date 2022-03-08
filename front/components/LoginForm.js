import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Input, Button } from 'antd';
import useInput from './hooks/useInput';
import Link from 'next/link';
import AccountLayout from './AccountLayout';
import { loginRequestAction } from '../reducers/user';

import styles from '../assets/styles/component/accountForm.module.css';

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
        <Form className={styles.form} onFinish={ onSubmitForm }>
          <div>
            <Input className={styles.input} name="user-email" value={ email } placeholder="이메일" onChange={ onChangeEmail }></Input>
            <Input className={styles.input} name="user-password"
                type="password"
                value={ password }
                placeholder="비밀번호"
                onChange={ onChangePassWord }
                required>
            </Input>
            <Button className={styles.button} type="primary" htmlType="submit" loading={ logInLoading }>로그인</Button>
          </div>
          <hr className={styles.hr} />
          <div className={styles.signup}>
            <Link href="/signup"><a>회원가입</a></Link>
          </div>
        </Form>
      </AccountLayout>
    </>
  )
}

LoginForm.proptypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default LoginForm;