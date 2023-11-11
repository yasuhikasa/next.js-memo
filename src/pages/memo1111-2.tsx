// pages/wait-screen.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WaitScreen = () => {
  const [data, setData] = useState({ version: '', title: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/page/common/0g?warmup=true');
      setData(response.data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>バージョン: {data.version}</p>
      {/* その他の待機画面のコンテンツ */}
    </div>
  );
};

export default WaitScreen;


// // Express.jsのルート設定
// app.get('/page/common/0g', (req, res) => {
//   const query = req.query;
//   if (query.warmup === 'start') {
//     // ウォームアップ処理の開始
//     // 必要なロジックを実装
//   } else if (query.warmup === 'true') {
//     // ウォームアップ処理の終了
//     res.json({
//       version: 'バージョン情報',
//       title: 'タイトル'
//     });
//   }
// });
