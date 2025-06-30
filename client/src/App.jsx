// ChatGPT連携の簡易UI（仮）
import React, { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendToGPT = async () => {
    const res = await fetch('/api/interpret', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text: message })
    });
    const data = await res.json();
    setResponse(data.action || '解釈できませんでした');
  };

  return (
    <div className="p-4">
      <h1>Handy 音声命令テスト</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendToGPT}>送信</button>
      <p>解釈結果: {response}</p>
    </div>
  );
}
