const { DataTypes, Sequelize } = require('sequelize');
module.exports = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
export { };