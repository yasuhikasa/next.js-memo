// import React, { useState } from "react";
// import axios from "axios";
// import { GetServerSideProps, NextPage } from "next";

// type Token = {
//   csrfToken: string;
// };

// const GetAirconProperties: NextPage<Token> = (props) => {
//   const [result, setResult] = useState("");

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "/api/v1/controllers/gw/airconProperties",
//         {
//           params: {
//             request_type: "getAllAirconPropScope",
//             source_module: "ApiServer",
//             request_id: "1234567890",
//             token: props.csrfToken  // CSRFトークン
//           }
//         }
//       );
//       setResult(JSON.stringify(response.data, null, 2));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchData}>Fetch Aircon Properties</button>
//       {result && <pre>{result}</pre>}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   // ここでCSRFトークンを取得する処理
//   const res = await axios.get("/api/v1/controllers/gw/token/getCsrfToken");
//   const csrfToken = res.data.token;

//   return {
//     props: {
//       csrfToken,
//     },
//   };
// };

// export default GetAirconProperties;


// // pages/api/v1/controllers/gw/airconProperties.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     const { request_type, source_module, request_id, token } = req.query;

//     try {
//       const backendRes = await axios.get(`http://your-express-backend-url/your-endpoint`, {
//         params: { request_type, source_module, request_id, token }
//       });
//       res.status(backendRes.status).json(backendRes.data);
//     } catch (error) {
//       res.status(error.response?.status || 500).json(error.response?.data || {});
//     }
//   } else {
//     res.status(405).end(); // Method not allowed
//   }
// };

// export default handler;


// import express from 'express';

// const app = express();
// app.use(express.json());

// // スタブデータ
// const stubData = {
//   temperature: 25,
//   humidity: 40,
// };

// app.get('/api/v1/controllers/gw/airconProperties', (req, res) => {
//   const { request_type, source_module, request_id } = req.query;

//   if (request_type === 'getAllAirconPropScope' && source_module === 'ApiServer') {
//     let data;

//     // NODE_ENVに応じてデータを返す
//     if (process.env.NODE_ENV === 'development') {
//       // スタブデータを返す
//       data = stubData;
//     } else {
//       // 本番環境では実際の処理
//       data = {
//         // 実際のデータ処理
//       };
//     }

//     res.status(200).json(data);
//   } else {
//     res.status(400).send('Invalid request');
//   }
// });

// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// URLを入力する。例：http://localhost:3001/api/v1/controllers/gw/airconProperties
// URLの末尾にクエリパラメータを追加する。例：?request_type=getAllAirconPropScope&source_module=ApiServer&request_id=1234567890
// もしくは、PostmanのUIで「Params」タブを選び、キーと値のペアを入力する。すると、URLに自動的に追加されます。
// 送信ボタンを押す。


// // pages/api/v1/controllers/gw/airconProperties.js

// import { NextApiRequest, NextApiResponse } from "next";
// import axios from 'axios'; // npm install axios が必要

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { request_type, source_module, request_id, token } = req.query;

//   // CSRFトークンの確認
//   if(token !== 'expectedCsrfToken') { // この部分は実際のCSRFトークン確認処理に置き換える
//     return res.status(403).json({ message: 'Invalid CSRF token' });
//   }

//   if (request_type === 'getAllAirconPropScope' && source_module === 'ApiServer' && typeof request_id === 'string') {
//     try {
//       const backendRes = await axios.get(`https://backend.example.com/realEndpoint?${req.query.toString()}`, {
//         headers: {
//           // ここに必要なヘッダーを追加
//         },
//       });
//       return res.status(200).json(backendRes.data);
//     } catch (error) {
//       console.error('Backend fetch failed:', error);
//       return res.status(500).json({ message: 'Backend fetch failed' });
//     }
//   } else {
//     return res.status(400).json({ message: 'Invalid request' });
//   }
// }

// import { ReactNode, useLayoutEffect, useRef, CSSProperties, useEffect } from "react"
// import styles from "./Layout.module.scss"
// import * as def from "@/definitions/def"

// type LayoutProps = {
//   children?: ReactNode // 画面表示コンテンツ
// }

// const useIsomorphicEffect = () => {
//   return typeof window !== "undefined" ? useLayoutEffect : useEffect
// }

// /**
//  * レイアウトコンポーネント
//  * @param {LayoutProps} children
//  * @returns {JSX.Element} レイアウトコンポーネント
//  */
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null)
//   const isomorphicEffect = useIsomorphicEffect()

//   isomorphicEffect(() => {
//     //UA取得
//     const ua = window.navigator.userAgent
//     //画面の縦幅横幅取得
//     const windowHeight = window.innerHeight
//     const windowWidth = window.innerWidth

//     const yScale = windowHeight / def.VIEW_HEIGHT
//     const xScale = windowWidth / def.VIEW_WIDTH
//     let minScale = xScale
//     if (minScale > yScale) {
//       minScale = yScale
//     }
//     //クラウジュとドアホンの場合はscale入れない
//     //スマホの場合はアスペクト比そのまま
//     //自モニタの場合はアスペクト比そのまま、左寄せ
//     if (ua.match(def.SELF_MONITOR) || ua.match(def.HOME)) {
//       inputElement.current.style.transform = "scale(" + minScale + ")"
//       //左寄せにするために、横幅を計算。右からその長さを指定
//       const nowWidth = minScale * def.VIEW_WIDTH
//       if (nowWidth != windowWidth) {
//         inputElement.current.style.marginRight = windowWidth - nowWidth + "px"
//       }
//     } else if (!ua.match(def.DOOR) && !ua.match(def.CLOUDGE)) {
//       //ドアホンとクラウジュ以外
//       inputElement.current.style.transform = "scale(" + minScale + ")"
//     } else {
//       //ドアホンとクラウジュは800*480なので、何もしない
//     }
//   })

//   return (
//     <div className={styles.container}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Layout


