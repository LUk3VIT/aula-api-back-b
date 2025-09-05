import express from 'express';
import SwaggerUi from 'swagger-ui-express';

import {swaggerSpec} from './config/swagger';
import alunoRouter from './routes/AlunoRoute';
import authRouter from './routes/authRoute';


const app = express();

app.use(express.json());

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

app.use("/aluno", alunoRouter);
app.use("/auth", authRouter)


app.listen(3000, () => {
  console.log('API Server rodando');
});