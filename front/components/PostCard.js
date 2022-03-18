import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommnetForm';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';

import styles from '../assets/styles/component/postCard.module.css';

moment.locale('ko');

const PostCard = ({ post, className }) => {
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const { removeCommentLoading, retweetError } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  // optional chaning 연산자 - me가 있으면 id가 들어가고 없으면 undefined가 들어가는 연산자
  // const id = me?.id;
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    });
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    });
  }, [id]);

  return (
    <>
      <div className={styles.container}>
        <Card
          className={className}
          cover={post.Images[0] && <PostImages images={post.Images} />} 
          actions={[
            <RetweetOutlined key='retweet' onClick={onRetweet}/>,
            liked 
              ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLike}/>
              : <HeartOutlined key='heart' onClick={onLike} />,
            <MessageOutlined key='comment' onClick={onToggleComment}/>,
            <Popover key='more' content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type='danger' onClick={onRemovePost} loading={ removeCommentLoading }>삭제</Button>
                  </>
                ) : (
                  <>
                    <Button>신고</Button>
                    <FollowButton post={post}/>
                  </>
                )
              }
              </Button.Group>
            )}>
              <EllipsisOutlined />
            </Popover>
          ]}
          title={ post.RetweetId ? `${post.User.nickname}님이 리트윗 하였습니다.` : null }
          >
          { post.RetweetId && post.Retweet 
            ? (
              <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
                <div className={styles.createTime}>{moment(post.createAt).startOf('hour').fromNow()}</div>
                <Card.Meta 
                  avatar={(
                    <Link href={`/user/${post.Retweet.User.id}`}>
                      <a><Avatar>{post.Retweet.User.nickname}</Avatar></a>
                    </Link>
                  )}
                  title={post.Retweet.User.nickname}
                  description={<PostCardContent postData={post.Retweet.content} />}>
                </Card.Meta>
              </Card>
            ) : (
              <>
                <div className={styles.createTime}>{moment(post.createAt).startOf('hour').fromNow()}</div>
                <Card.Meta 
                  avatar={(
                    <Link href={`/user/${post.id}`}>
                      <a><Avatar>{post.User.nickname}</Avatar></a>
                    </Link>
                  )}
                  title={post.User.nickname}
                  description={<PostCardContent postData={post.content} />}>
                </Card.Meta>
              </>
            )}
        </Card>
        {
          commentFormOpened && 
          <div>
            <CommentForm post={post}/>
            <List 
              header={ `${post.Comments.length}개의 댓글` }
              itemLayout='horizontal'
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment 
                    author={item.User.nickname}
                    avatar={(
                      <Link href={`/user/${item.User.id}`}>
                        <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                      </Link>
                    )}
                    content={item.content}
                  />
                </li>
              )}
            />
          </div>
        }
      </div>
    </>
  )
}

PostCard.propTypes= {
  // object props 는 shape를 이용해서 구체적으로 정의가능
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;