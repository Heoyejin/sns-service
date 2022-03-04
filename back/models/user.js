const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있는데 mySql에서 자동으로 만들어줌
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,   // Required
        unique: true
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,   // Required
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,   // Required
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci',  // 한글 저장
      sequelize,
    });
  }
  
  // 두 개이상의 테이블에 참조되는 데이터들을 정의함
  static associate(db) {
    db.User.hasMany(db.Post),
    db.User.hasMany(db.Comment),
    // 좋아요 설정 - through로 중간 테이블 이름을 바꿔줌
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }),
    // 같은 테이블 끼리의 관계 설정에서는 foreignKey를 명시해줘야함
    // 중간 테이블이 생겼을 때 테이블 구분을 해주기 위함
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowingId' }),
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowerId' })
  };
}