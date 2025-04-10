import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import assistenteRoutes from './routes/assistenteRoutes';
import uploadRoutes from './routes/uploadRoutes'; 
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

console.log('__dirname:', __dirname);
console.log('Servindo estáticos de:', path.join(__dirname, 'uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (_: Request, res: Response) => {
  res.send('EduConnect API rodando com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
