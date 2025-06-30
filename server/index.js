// ChatGPT連携による命令解釈API
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/api/interpret', async (req, res) => {
  const userText = req.body.text;
  const prompt = `ユーザーの要望を解釈し、Handyへの命令（例: speed+=10, stop, stroke=30-60など）に変換してください。

命令: ${userText}
出力:`;

  try {
    const gptRes = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 20,
    });
    const action = gptRes.data.choices[0].text.trim();
    res.json({ action });
  } catch (err) {
    res.status(500).json({ error: 'API error' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
