import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

// 각 페이지(index.js)의 return 부분이 _app.js의 Component에 들어간다.
const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      { me && <PostForm /> }
      { mainPosts.map((post, index) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  )
}

export default Home;