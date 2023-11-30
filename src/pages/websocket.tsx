import { useRef, useState } from "react"
import styles from "./webSocketCmp.module.scss"
import { useWebSocket, useWebSocketConnect, useWebSocketActivate, useWebSocketClose } from "@/libs/websocket"
import Button from "@/components/uiparts/Button"

const WebSocketCmp = (props) => {
  const socketRef = useRef<WebSocket>()
  const [disp, setDisp] = useState()

  console.log("WebSocketCmp props")
  console.dir(props, { depth: null })

  const callBackFunc = (data) => {
    console.log("WebSocketCmp CallBack", data)
    setDisp(data)
  }

  // 画面表示時に、接続有効化する使用例
  useWebSocket(callBackFunc, props.token.csrfToken, socketRef)

  // 個別に接続、有効化、切断する使用例
  const handleConnectClick = () => {
    useWebSocketConnect(callBackFunc, socketRef)
  }

  const handleActiveClick = () => {
    if (socketRef) {
      useWebSocketActivate(socketRef.current, props.token.csrfToken)
    } else {
      console.log("WebSocketCmp activate ref socket err")
    }
  }

  const handleCloseClick = () => {
    if (socketRef) {
      useWebSocketClose(socketRef.current)
    } else {
      console.log("WebSocketCmp close ref socket err")
    }
  }

  const MainCont = (
    <div className={styles.body}>
      WebSocketTest
      <Button title={"Connect"} handleBtnClick={handleConnectClick} />
      <Button title={"Activate"} handleBtnClick={handleActiveClick} />
      <Button title={"Close"} handleBtnClick={handleCloseClick} />
    </div>
  )

  return <>{MainCont}</>
}

export default WebSocketCmp
