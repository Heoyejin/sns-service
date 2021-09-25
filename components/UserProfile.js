import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  });


  return (
    <>
    <Card
      actions={[
        <div key="twit">트위터<br />@</div>,
        <div key="followings">팔로잉<br />@</div>,
        <div key="follower">팔로워<br />@</div>
      ]}>
      <Card.Meta
        avatar={<Avatar></Avatar>}
        title='Yeeeeeah'
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
    </>
  )
}

export default UserProfile;