import React from 'react';
import PropTypes from 'prop-types';
// head 태그를 수정하려면 next의 head 컴포넌트를 사용해야함.
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore'; 

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>twitter</title>
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);