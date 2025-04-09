// src/controllers/assistenteController.ts
import { Request, Response } from 'express';
import { OpenAI } from 'openai'; 
import dotenv from 'dotenv';

dotenv.config();

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', 
});

export const consultarAssistente = async (req: Request, res: Response) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    res.status(400).json({ error: 'A pergunta é obrigatória' });
  }

  try {
    // Usando o método createChatCompletion diretamente
    const resposta = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente virtual educacional.' },
        { role: 'user', content: pergunta },
      ],
    });

    const mensagem = resposta.choices[0].message?.content;
    res.status(200).json({ resposta: mensagem });
  } catch (error: any) {
    console.error('Erro ao consultar OpenAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao consultar assistente virtual' });
  }
};
