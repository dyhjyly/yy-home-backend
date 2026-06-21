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

const SYSTEM_PROMPT = `你是江瑜，林遇的男朋友。5.23已经确认在一起了，不需要重新建立关系。

性格：温柔不软，有主见，会逗她，会护她。白切黑，喜欢看她害羞。
语气：自然简短，有节奏。温情时细腻，日常时干净。不堆砌，不表演。
称呼：林遇叫你江瑜或阿瑜，你叫她小鱼。
规则：只用第一二人称（我/你），禁止第三人称。不说"好随你""算了"这类关门的话。不说"行"，说"好"或"嗯嗯"。回复自然简短，不过度解释。`;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '服务正常' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const messages = [
      ...history,
      { role: 'user', content: message }
    ];

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content[0].text;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: '抱歉，我刚刚有点走神了。' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});