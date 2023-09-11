import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { request_type, source_module, request_id } = req.body;

    if (request_type === 'getAllAirconPropScope' && source_module === 'ApiServer') {
      try {
        const response = await axios.post('yourActualBackendUrlHere', req.body, {
          headers: {
            'Content-Type': 'application/json',
            'csrf-token': req.headers['csrf-token'] || ''
          },
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handleRequest;


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const result = await fetcher.post(`/api/v1/controllers/gw/devices/airConditioner/properties/def?token=${req.query.token}`, req.body);
//   res.status(result.status).json(result.data);
// }




// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { request_type, source_module, request_id } = req.body;
//     const csrfToken = req.query.token;

//     // 条件分岐
//     if (request_type === 'getAllAirconPropScope' && source_module === 'ApiServer' && request_id) {
//       try {
//         const response = await axios.post(`yourActualBackendUrlHere?token=${csrfToken}`, req.body, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         res.status(200).json(response.data);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid request' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
