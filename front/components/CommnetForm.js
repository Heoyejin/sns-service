import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import useInput from './hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

import styles from '../assets/styles/component/commentForm.module.css';
const CommentForm = ({post}) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommnetText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback((e) => {
    console.log("onSubmitComment", e);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id }
    });
  }, [commentText, id]);

  return (
    <>
      <div className={styles.container}>
        <Form className={styles.form} onFinish={onSubmitComment}>
          <Form.Item className={styles.formItem}>
            <Input value={commentText} onChange={onChangeCommnetText} rows={4} bordered={false} placeholder='댓글 달기...'/>
          </Form.Item>
          <Button htmlType='submit' loading={addCommentLoading}>입력</Button>
        </Form>
      </div>
    </>
  )
}

CommentForm.prototype = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
};

export default CommentForm;