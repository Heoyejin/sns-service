import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { addPost } from '../reducers/post';
import useInput from './hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.imagePaths);
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
          <input type="file" multiple hidden ref={imageInput}></input>    
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>업로드</Button>
        </div>
        <div>
          {
            imagePaths && 
              imagePaths.map((v) => (
                <div key={v} style={{ display: 'inline-block' }}>
                  <img src={v} style={{ width: '200px' }} alt={v} />
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