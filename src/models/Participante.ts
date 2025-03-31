import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Particiapante extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public matricula!: string;
}

Particiapante.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    {
        sequelize,
        tableName: "participantes",
        timestamps: true,
        paranoid: true,
    }
)