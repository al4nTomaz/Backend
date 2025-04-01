import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Evento extends Model {
    public id!: number;
    public nome!: string;
}

Evento.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    },
    {
        sequelize,
        tableName: "eventos",
        timestamps: true,
        paranoid: true,

    }
)