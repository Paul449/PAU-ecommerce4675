const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement:true,
    },
    product_id:{
      type: DataTypes.INTEGER,
      id: Product.hasOne(product_id,{
        foreignKey:'id'
      }),
    },
    tag_id:{
      type: DataTypes.INTEGER,
      id: Tag.hasOne(tag_id,{
        foreignKey:'id'
      })
    }
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
