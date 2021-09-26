import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import useInput from './hooks/useInput';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/post';

const CommentForm = ({post}) => {
  const [commentText, onChangeCommnetText] = useInput('');

  const onSubmitComment = useCallback((e) => {
    console.log("onSubmitComment", e);
  }, []);

  return (
    <>
      <Form onFinish={onSubmitComment}>
        <Form.Item style={{ position: 'relative', margin: 0 }}>
          <Input.TextArea value={commentText} onChange={onChangeCommnetText} rows={4} />
          <Button style={{ position: 'absolute', right: 0, bottom: -40 }} htmlType='submit'>입력</Button>
        </Form.Item>
      </Form>     
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