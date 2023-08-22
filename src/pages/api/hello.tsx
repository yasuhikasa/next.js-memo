/* eslint-disable import/no-anonymous-default-export */
// pages/api/redirect.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const customHeader = req.headers['app-type'];

  if (customHeader === 'user') {
    res.setHeader('Set-Cookie', `customHeader=User; Path=/`);
    res.writeHead(302, {
      Location: '/userPage',
    });
    res.end();
  } else if (customHeader === 'setting') {
    res.setHeader('Set-Cookie', `customHeader=Setting; Path=/`);
    res.writeHead(302, {
      Location: '/settingPage',
    });
    res.end();
  } else {
    res.status(400).json({ message: 'Invalid custom header value' });
  }
};
