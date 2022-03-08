import React from 'react';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { Card } from 'antd';

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

import styles from '../assets/styles/component/accountLayout.module.css';

const AccountLayout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <Card className={styles.card}>{ children }</Card>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, next}) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  console.log('getServerSideProps end');
  await store.sagaTask.toPromise();
});

export default AccountLayout;