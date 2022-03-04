import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col  } from 'antd';
import Router from 'next/router';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import useInput from './hooks/useInput';

// style을 컴포넌트 쓰기 싫으면 useMome 사용가능
// const SearchInput = styled(Input.Search)`
//   vertical-align: 'middle';
// `;

const { Search } = Input;
// index, profile, signup 페이지에서 공통적으로 사용할 레이아웃 생성
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const style = useMemo(() => ({ marginTop: 10 }), []);
  
  const [searchInput, onChangeSearchInput] = useInput('');
  
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);
  
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
          <Search
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            style={style} 
          />
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu> 
      <Row gutter={8}>
        {/* xs: 24=100% 기준으로  md:차지할 비율 */}
        {/* https://ant.design/components/grid/ 참고*/}
        <Col xs={24} md={6}>
          { me ? <UserProfile/> : <LoginForm/> }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>

        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;