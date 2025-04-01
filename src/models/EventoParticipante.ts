import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Particiapante } from './Participante';
import { Evento } from './Evento';

export class EventoParticipante extends Model {
    public participanteId!: number;
    public eventoId!: number;
}

EventoParticipante.init(
    {
        participanteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Particiapante,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        eventoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Evento,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "eventos_participantes",
        timestamps: false,

    }
)