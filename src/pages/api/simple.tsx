import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('x-custom-header', 'construction'); // カスタムヘッダーを追加
  res.status(200).json({ message: 'Custom header added' });
}
