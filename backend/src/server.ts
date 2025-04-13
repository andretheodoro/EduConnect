import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import assistenteRoutes from './routes/assistenteRoutes';
import uploadRoutes from './routes/uploadRoutes'; 
import eventosRoutes from './routes/eventos';
import frequenciasRoutes from './routes/frequenciasRoutes';
import alunosRoutes from './routes/alunosRoutes';
import notasRoutes from './routes/notasRoutes';
import bemEstarRoutes from './routes/bemEstarRoutes';
import feedRoutes from './routes/feedRoutes';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', assistenteRoutes);
app.use('/api', uploadRoutes); 
app.use('/api/eventos', eventosRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/frequencias', frequenciasRoutes);
app.use('/api/alunos', alunosRoutes);
app.use('/api/bem-estar', bemEstarRoutes);
app.use('/api/feed', feedRoutes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'src', 'uploads')));

app.get('/', (_: Request, res: Response) => {
  res.send('EduConnect API rodando com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
