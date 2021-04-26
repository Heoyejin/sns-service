import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NickNameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [{nickName: '유야호'}, {nickName: '지미유'}, {nickName: '비룡'}];
  const followingList = [{nickName: '린다G'}, {nickName: '은비'}, {nickName: '만옥'}];
  
  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm></NicknameEditForm>
        <FollowList header="팔로워 목록" data={followerList}></FollowList>
        <FollowList header="팔로잉 목록" data={followingList}></FollowList>
      </AppLayout>
      <div>내 프로필</div>
    </>
  )
}

export default Profile;