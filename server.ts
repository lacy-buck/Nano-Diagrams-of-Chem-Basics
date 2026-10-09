import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Download Word Document Route
  app.get('/api/download-docx', (req, res) => {
    const docxPath = path.join(process.cwd(), 'Particle_Chemistry_Lab_SourceCode.docx');
    if (fs.existsSync(docxPath)) {
      res.download(docxPath, 'Particle_Chemistry_Lab_SourceCode.docx');
    } else {
      res.status(404).send('Word document file not found.');
    }
  });

  // Initialize Gemini AI Client lazily or server-side
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Endpoint for Dr. Atom AI Tutor
  app.post('/api/gemini-tutor', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getAiClient();
      if (!ai) {
        return res.json({
          reply:
            'Dr. Atom Tutor Note: No GEMINI_API_KEY configured yet. You can configure it in the Secrets panel! Meanwhile: Atoms are single spheres, molecules are bonded groups, elements contain one atom type, and compounds contain multiple bonded element types!',
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are Dr. Atom, a friendly, encouraging high school chemistry tutor specializing in particle diagrams. Explain concepts simply and clearly using particle-level visual descriptions (spheres, bonds, mixtures vs pure substances, states of matter). Keep responses concise (under 150 words) and high school level appropriate.',
        },
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        reply:
          'I encountered a brief hiccup analyzing that question. Remember: An element contains only one type of atom, while a compound contains two or more different atom types chemically bonded!',
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
