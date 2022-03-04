import React from 'react';

import styled from 'styled-components';
import { Card } from 'antd';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const AccountWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgb(250, 250, 250);
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled(Card)`
  width: 350px;
  border: solid 1px rgb(219,219,219);
`;

const AccountLayout = ({ children }) => {

  return (
    <>
      <AccountWrapper>
        <CardWrapper>
          { children }
        </CardWrapper>
      </AccountWrapper>
    </>
  )
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