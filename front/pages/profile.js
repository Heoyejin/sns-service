import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import { ProfilePost } from '../assets/styles/global';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';


import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

import styles from '../assets/styles/pages/profile.module.css';
import { TabAlignCenter } from '../assets/styles/global';

// graphql도 사용해보기
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  // 둘다 없으면 로딩중, 
  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);
  const { mainPosts } = useSelector((state) => state.post);

  const router = useRouter();
  const dispatch = useDispatch();

  // 로그인 하지 않고 프로필 화면으로 가는 경우 오류
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    } else {
      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
        data: me.id
      });
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) return <div>내 정보 로딩중..</div>;

  // 아래 return이 Hooks 보다 위에 있으면 경우에 따라 렌더링 횟수가 달라지므로 이런 경우 Hooks는 에러를 발생시킴.
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <TabAlignCenter/>
        <Tabs defaultActiveKey='1' centered>
          <Tabs.TabPane tab="게시물" key="1" >
            <div className={ styles.container }>
              { 
                mainPosts && mainPosts.map((c) => (
                  <ProfilePost key={c.id} post={c} />
                ))
              }
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="저장됨" key="2">
            저장된 목록
          </Tabs.TabPane>
          <Tabs.TabPane tab="팔로잉/팔로워" key="3">
            <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followerError}></FollowList>
            <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}></FollowList>
          </Tabs.TabPane>
        </Tabs>
      </AppLayout>
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
  await store.sagaTask.toPromise();
});

export default Profile;