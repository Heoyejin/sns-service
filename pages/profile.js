import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  
  // 로그인 하지 않고 프로필 화면으로 가는 경우 오류
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  if (!me) return null;

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm></NicknameEditForm>
        <FollowList header="팔로잉 목록" data={me.Followings}></FollowList>
        <FollowList header="팔로워 목록" data={me.Followers}></FollowList>
      </AppLayout>
      <div>내 프로필</div>
    </>
  )
}

export default Profile;