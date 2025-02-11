module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporarily allow null to avoid conflicts
      references: {
        model: "roles", // Ensure this matches your actual "roles" table name
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "roleId");
  },
};
