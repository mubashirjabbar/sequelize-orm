module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        { name: "admin", createdAt: new Date(), updatedAt: new Date() },
        { name: "student", createdAt: new Date(), updatedAt: new Date() },
        { name: "teacher", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
