import { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@/libs/fetcher"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method == "PUT") {
/*
* ユーザー設定変更(PUT)
* @method /api/v1/controllers/gw/userSetting
*/
    try {
        const result = await fetcher.put(`/api/v1/controllers/gw/userSetting, req.body`)
            res.status(result.status).json(result.data)
            } catch (e) {
            res.status(500).json(e)
        }
    } else if (req.method == "GET") {
/*/
* ユーザー設定取得(GET)
* @method /api/v1/controllers/gw/userSetting
**/
    try {
        const result = await fetcher.get(`/api/v1/controllers/gw/userSetting?token=${req.query.token}`)
            res.status(result.status).json(result.data)
            } catch (e) {
            res.status(500).json(e)
    }
    }
  }