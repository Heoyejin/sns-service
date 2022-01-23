module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id가 기본적으로 들어있는데 mySql에서 자동으로 만들어줌
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'  // 한글 + 이모티콘 저장
  });
  
  Post.associate = (db) => {
    db.Post.belongsTo(db.User), // post.addUser, post.getUser, post.setUser
    // 다 대 다 관계는 belongsToMany
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }),  // post.addHashtags
    db.Post.hasMany(db.Comment),  // post.addComments, post.getComments
    db.Post.hasMany(db.Image),  // post.addImages, post.getImages
    // 좋아요 설정 - through로 중간 테이블 이름을 바꿔줌
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }),  // post.addLikers, post.removeLikers
    // 리트윗해서 복사되는 원본 게시글 하나에 복사되는 게시글 여러개가 생김
    db.Post.belongsTo(db.Post, { as : 'Retweet'}) //post.addRetweet
  };
  return Post;
}