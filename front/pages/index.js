import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

// 각 페이지(index.js)의 return 부분이 _app.js의 Component에 들어간다.
const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);
  
  // https://github.com/bvaughn/react-virtualized
  // 메모리에 로드된 데이터는 다 담아놓고 실제 Dom에 그리는 데이터는 2-3개로 제한할 수 있음
  useEffect(() => {
    function onScroll() {
      // 이렇게 하면 다음 로딩하는데 까지 약간의 시간이 걸리기 때문에 300px 정도 위에서 미리 로딩
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostLoading) {
          console.log(hasMorePost, loadPostLoading);
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [mainPosts, hasMorePost, loadPostLoading]);

  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      { me && <PostForm /> }
      { mainPosts.map((post, index) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  )
}

export default Home;