module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    // id가 기본적으로 들어있는데 mySql에서 자동으로 만들어줌
    src: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'  // 한글 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post)
  };
  return Image;
}