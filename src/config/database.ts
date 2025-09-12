import { error } from 'console';
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
})

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch {
        console.log("Erro ao conectar ao Banco", error);
    }
}

