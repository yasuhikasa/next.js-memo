// pages/api/redirect.ts

import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const customHeader = req.headers['app-type'];

  if (customHeader === 'user' || customHeader === 'setting') {
    res.status(200).json({ customHeader });
  } else {
    res.status(400).json({ message: 'Invalid custom header value' });
  }
};

export default handler;
