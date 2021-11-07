module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // id가 기본적으로 들어있는데 mySql에서 자동으로 만들어줌
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // belongTo를 선언하면 아래 처럼 컬럼 정보가 생성됨
    // UserId: 1
    // PostId: 3
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'  // 한글 + 이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User),
    db.Comment.belongsTo(db.Post)
  };
  return Comment;
}