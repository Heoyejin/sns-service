import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_POST_REQUEST } from '../reducers/user';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () =>  {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  // 잠깐 기다려주는 로직을 추가
  if (router.isFallback) {
    return <div>로딩중...</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export async function getStaticPaths() {
  // 아래처럼 미리 paths를 미리 지정해놔야함.
  // 페이지가 제한적인 경우에만 사용가능 함.
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // fallback이 true 인 경우 에러는 안나지만 서버사이드 렌더링 불가능
    fallback: false,
  }
}

// 동적 라우팅에서 getStaticProps를 사용하면 무조건 오류가 나기 때문에 getStaticPaths를 선언해줘야함.
export const getStaticProps = wrapper.getStaticProps(store => async ({req, res, next}) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; 
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie; 
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: req.params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;