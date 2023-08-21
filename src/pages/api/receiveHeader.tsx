import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const customHeader = req.headers['app-type'];

  if (customHeader === 'setting') {
    res.status(200).json({ redirectPath: '/adminPage' });
  } else if (customHeader === 'user') {
    res.status(200).json({ redirectPath: '/userPage' });
  } else {
    res.status(200).json({ redirectPath: '/guestPage' });
  }
}
