import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col  } from 'antd';

import LoginForm from '../components/LoginForm';
// index, profile, signup 페이지에서 공통적으로 사용할 레이아웃 생성
const AppLayout = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
      <Menu.Item>
        <Link href='/'><a>공통메뉴</a></Link>
      </Menu.Item>
      <Menu.Item>
        <Link href='/profile'><a>프로필</a></Link>
      </Menu.Item>
      <Menu.Item>
        <Search style={style}></Search>
      </Menu.Item>
      <Menu.Item>
        <Link href='/sigup'><a>회원가입</a></Link>
      </Menu.Item>
      </Menu> 
      <Row gutter={8}>
        {/* xs: 24=100% 기준으로  md:차지할 비율 */}
        {/* https://ant.design/components/grid/ 참고*/}
        <Col xs={24} md={6}>
          { isLogged ? <UserProfile setIsLogged={setIsLogged} /> : <LoginForm setIsLogged={setIsLogged} /> }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://demo.ibleaders.com/ibsheet/v8/samples/customer-sample/html/main.html" target="_blank" rel="noreferrer noopener">IBSheet Demo</a>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;