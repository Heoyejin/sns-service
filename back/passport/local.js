const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// 서버 Login 처리
module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async(email, password, done) =>{
    try {
      // 여기에 db에 저장된 데이터 컬럼 별로 다 들어있음
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        // Server Error, Success, client Error
        return done(null, false, { reason: '존재하지 않는 이메일입니다 !'});
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.'});
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
}