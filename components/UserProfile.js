import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
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
        avatar={<Avatar>{ me.nickname }</Avatar>}
        title={ me.nickname }
      />
      <Button onClick={onLogout} loading={ isLoggingOut }>로그아웃</Button>
    </Card>
    </>
  )
}

export default UserProfile;