'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.BIGINT,
          autoIncrement: true
        },
        application_id: {
          allowNull: false,
          type: Sequelize.UUID,
          foreignKey: true,
          reference:{
            model: 'application',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        payment_intent: {
          allowNull: false,
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, /*Sequelize*/) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}