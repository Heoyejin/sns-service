import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';

const UserProfile = ({ setIsLogged }) => {
  const onLogout = useCallback(() => {
    setIsLogged(false);
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