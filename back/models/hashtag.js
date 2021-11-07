module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    // id가 기본적으로 들어있는데 mySql에서 자동으로 만들어줌
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'  // 한글 + 이모티콘 저장
  });
  Hashtag.associate = (db) => {
    // 다 대 다 관계의 테이블은 중간에 관련 테이블이 하나 생기는 방식임
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
  };
  return Hashtag;
}