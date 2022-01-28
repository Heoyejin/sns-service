import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { addPost } from '../reducers/post';
import useInput from './hooks/useInput';
import { UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // 실제 Dom에 접근하기 위해서 ref를 사용함.
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() =>{
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onChangeImages = useCallback((e) => {
    console.log('image', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    console.log('imageFormData', imageFormData);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  return (
    <>
      <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="퇴사하고 싶어요ㅜㅜ"
        />
        <div>
          <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>업로드</Button>
        </div>
        <div>
          {
            imagePaths && 
              imagePaths.map((v, i) => (
                <div key={v} style={{ display: 'inline-block' }}>
                  <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                  <div>
                    <Button>제거</Button>
                  </div>
                </div>
            ))
          }
        </div>
      </Form>
    </>
  )
}
  
export default PostForm;