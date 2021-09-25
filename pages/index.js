import React from 'react';
import AppLayout from '../components/AppLayout';

// 각 페이지(index.js)의 return 부분이 _app.js의 Component에 들어간다.
const Home = () => {
  return (
    <AppLayout>
      <div>홈 화면</div>
    </AppLayout>
  )
}

export default Home;