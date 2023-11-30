/****************************************************
 * ブラウザ～コンテンツサーバ WebSocket接続モジュール(カスタムフック)
 * @module webSocket
 *****************************************************/
import { useEffect } from "react"
import fetcher from "@/libs/fetcher"

const wsUrl = "/api/v1/controllers/gw/websocket"
const wsTokenUrl = "/api/v1/controllers/gw/token/getContentsWsToken"

/**
 * コンテンツ用のWebSocketに接続し、メッセージ受信を有効化する
 * @param {Function} callBackFunc  メッセージ受信時に通知を行うコールバック関数
 * @param {number} token  APIを使用するためのトークン
 * @param {Function} socketRef     WebSocketの参照
 */
export const useWebSocket = (callBackFunc, token, socketRef) => {
  useEffect(() => {
    useWebSocketConnect(callBackFunc, socketRef)
    useWebSocketActivate(socketRef.current, token)
  }, [])
}

/**
 * コンテンツ用のWebSocketに接続する
 * @param {Function} callBackFunc  メッセージ受信時に通知を行うコールバック関数
 * @param {Function} socketRef     WebSocketの参照
 */
export const useWebSocketConnect = (callBackFunc, socketRef) => {
  // WebSocketオブジェクトを生成しサーバとの接続を開始
  const url = location.host + wsUrl
  console.log("useWebSocket connect-1", `wss://${url}`)
  const ws = new WebSocket(`wss://${url}`)
  console.log("useWebSocket connect-2")
  socketRef.current = ws

  // メッセージ受信時にコールバック関数で使用元に通知する
  ws.onmessage = (message) => {
    callBackFunc(message)
  }

  // WebSocket接続
  ws.onopen = () => {
    console.log("useWebSocket onopen")
  }

  // WebSocket切断
  ws.onclose = () => {
    console.log("useWebSocket onclose")
  }

  // useEffectのクリーンアップの中で、WebSocket切断を行う
  return () => {
    if (ws.readyState === 1) {
      console.log("useWebSocket close")
      ws.close()
    }
  }
}

/**
 * メッセージ受信を有効化する
 * @param {number} ws     WebSocket
 * @param {number} token  APIを使用するためのトークン
 */
export const useWebSocketActivate = async (ws, token) => {
  let result
  try {
    // Websocketトークンを取得
    result = await fetcher.get(wsTokenUrl, { params: { token: token } })
  } catch (e) {
    console.log("useWebSocket get token err", e)
    return
  }

  // Websocketトークンを設定し、メッセージ受信を有効化する
  const obj = { token: result.data.wsToken }
  console.log("useWebSocket set token --> activate", obj)
  ws.send(JSON.stringify(obj))
}

/**
 * WebSocket切断
 * @param {number} ws  WebSocket
 */
export const useWebSocketClose = async (ws) => {
  console.log("useWebSocketClose")
  ws.close()
}
