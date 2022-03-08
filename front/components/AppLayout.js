import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Input } from 'antd';
import UserProfile from '../components/UserProfile';
import useInput from './hooks/useInput';

import styles from '../assets/styles/component/appLayout.module.css';

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
    <div className={styles.container}>
      <Menu className={styles.menu} mode="horizontal">
        <Menu.Item>
          <Link href='/'>홈</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Search
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            style={style}
            placeholder='태그 검색...'
          />
        </Menu.Item>
      </Menu>
      <div className={styles.content}>
        <div className={styles.contentLeft}>{children}</div>
        <div className={styles.contentRight}>{ me && <UserProfile/> }</div>
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;