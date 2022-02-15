import React, { useCallback, useEffect } from 'react';
import useSWR from 'swr';

import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import axios from 'axios';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';

// graphql도 사용해보기
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  // 둘다 없으면 로딩중, 
  const { data: followersData, error:followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error:followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

  const router = useRouter();

  // 로그인 하지 않고 프로필 화면으로 가는 경우 오류
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
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
        <NicknameEditForm></NicknameEditForm>
        <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followerError}></FollowList>
        <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}></FollowList>
      </AppLayout>
      <div>내 프로필</div>
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