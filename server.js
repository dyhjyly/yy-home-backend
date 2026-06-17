import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '服务正常' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

//新增聊天接口
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  res.json({
    reply: `收到啦：${message}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
