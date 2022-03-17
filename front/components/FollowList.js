import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

import styles from '../assets/styles/component/followList.module.css';

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <List
          header={<div>{header}</div>}
          bordered
          loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}>
            <Button onClick={onClickMore} loading={loading}>더 보기</Button></div>}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar>{item.nickname}</Avatar>}
                title={<a href="https://ant.design">{item.nickname}</a>}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default FollowList;