import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col  } from 'antd';

// index, profile, signup 페이지에서 공통적으로 사용할 레이아웃 생성
const AppLayout = ({ children }) => {
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
    </div>
  )
}

AppLayout.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;