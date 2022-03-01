const DataTypes = require('sequelize');
const { Model } = DataTypes;
module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    }, {
      modelName: 'Hashtag',
      tableName: 'Hashtag',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',  // 한글 + 이모티콘 저장
      sequelize,
    });
  }

  static associate(db) {
    // 다 대 다 관계의 테이블은 중간에 관련 테이블이 하나 생기는 방식임
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
  };
}