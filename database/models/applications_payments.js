'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationsPayments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApplicationsPayments.belongsTo(models.Applications, {as:'application', foreignKey:'application_id'})
    }
  }
  ApplicationsPayments.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true
    },
    application_id: {
      allowNull: false,
      type: DataTypes.UUID,
      foreignKey: true,
    },
    payment_intent: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'ApplicationsPayments',
    tableName: 'application_payments',
    underscored: true,
    timestamps: true
  });
  return ApplicationsPayments;
  
};