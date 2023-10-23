import Button from "./button"
import styles from "./Modal.module.scss"
import { useState, CSSProperties } from "react"

type btnItems = {
  btnTitle?: string // ボタンに表示する文字列
  handleClick?: () => void // ボタン押下時の動作
}

type ModalProps = {
  title: string // モーダルウィンドウタイトル
  modalCont: JSX.Element // モーダルウィンドウに表示するコンテンツ
  modalWidth?: string //モーダルウィンドウの幅
  modalHeight?: string //モーダルウィンドウの高さ
  bgColor?: string // ヘッダーの背景色
  fontColor?: string // ヘッダーの文字色
  fontSize?: string // ヘッダーの文字サイズ色
  hdDate?: string // ヘッダーに表示する日付
  btnWidth?: string // ボタンの幅
  btnMargin?: string // ボタン間の間隔
  btnItems?: btnItems[]
}

/**
 * モーダルウィンドウコンポーネント
 * @returns {JSX.Element} モーダルウィンドウコンポーネント
 */
const Modal = () => {
  const [show, setShow] = useState(false)
  // モーダルを開く
  const openModal = () => {
    setShow(true)
  }
  // モーダルを閉じる
  const closeModal = () => {
    setShow(false)
  }

  // モーダル表示コンテンツ
  const ModalCont = (props: ModalProps) => {
    if (!show) return null
    const headerStyle = {
      "--modal-width": props.modalWidth,
      background: props.bgColor,
    } as CSSProperties
    const headerTitle = {
      color: props.fontColor,
      fontSize: props.fontSize,
    } as CSSProperties
    const contStyle = {
      "--modal-height": props.modalHeight,
    } as CSSProperties
    const footerStyle = {
      "--modal-width": props.modalWidth,
    } as CSSProperties
    const btnStyle = {
      "--btn-margin": props.btnMargin,
    } as CSSProperties

    //フッター表示ボタン
    const btn: JSX.Element[] = []
    if (props.btnItems && props.btnItems.length) {
      {
        props.btnItems.map((item: btnItems) => {
          btn.push(
            <div className={styles.button} style={btnStyle} key={item.btnTitle}>
              <Button
                title={item.btnTitle ? [item.btnTitle] : ['']}
                handleBtnClick={item.handleClick}
                btnWidth={props.btnWidth ? props.btnWidth : "122px"}
              />
            </div>
          )
        })
      }
    }

    return (
      <>
        <div className={styles.modal_all}>
          <div className={styles.over_lay}></div>
          <div className={styles.modal}>
            <div className={styles.modal_header} style={headerStyle}>
              <div className={styles.header_title} style={headerTitle}>
                {props.title}
              </div>
              <div className={styles.header_date}>{props.hdDate}</div>
            </div>
            <div className={styles.modal_cont} style={contStyle}>
              {props.modalCont}
            </div>
            <div className={styles.footer} style={footerStyle}>
              <div className={styles.modal_button}>{btn}</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return { ModalCont, openModal, closeModal }
}

export default Modal