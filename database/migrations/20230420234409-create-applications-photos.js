'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('applications_photos', {
        application_id: {
          allowNull: false,
          type: Sequelize.UUID,
          primaryKey: true,
          foreignKey: true,
          reference:{
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        url: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        order: {
          allowNull: false,
          type: Sequelize.INTEGER
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
      await queryInterface.dropTable('applications_photos', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}