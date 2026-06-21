import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '服务正常',
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const reply = response.content[0].text;

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: '抱歉，我刚刚有点走神了。',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
