import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  
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