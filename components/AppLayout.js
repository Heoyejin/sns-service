import PropTypes from 'prop-types';
import Link from 'next/link';

// index, profile, signup 페이지에서 공통적으로 사용할 레이아웃 생성
const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href='/'><a>공통메뉴</a></Link>
        <Link href='/profile'><a>프로필</a></Link>
        <Link href='/signp'><a>회원가입</a></Link>
      </div>
      {children}
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;