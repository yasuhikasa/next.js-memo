import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const customHeader = req.headers['app-type'] as string;
  res.status(200).json({ customHeader });
};

export default handler;
