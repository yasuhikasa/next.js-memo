import Link from "next/link"
import styles from "./button.module.scss"
import { CSSProperties } from "react"
import Image from "next/image"

type ButtonProps = {
  title?: string[] // ボタンタイトル
  link?: string // ボタン押下時のリンク先
  icon?: string // アイコン
  handleBtnClick?: () => void // ボタンをクリックした時の動作
  bgColor?: string // ボタンの背景色
  btnWidth?: string // ボタンの幅
  btnHeight?: string // ボタンの高さ
  fontColor?: string // ボタンの文字色
  fontSize?: string // ボタンタイトルのフォントサイズ
  border?: string // ボタンの枠色
  disable?: boolean // 非活性のフラグ
}

/**
 * ボタン表示コンテンツ
 * @param {ButtonProps} props
 * @returns {JSX.Element} ボタン上に表示するアイコン、文字列のコンテンツ
 */
const mainCont = (props: ButtonProps) => {
  const btnStr: JSX.Element[] = []
  if (props.title) {
    props.title.map((propsStr) =>
      btnStr.push(
        <div key={propsStr}>
          {propsStr}
          <br />
        </div>
      )
    )
  }
  return (
    <ul className={styles.list_disp}>
      {props.icon && (
        <li className={styles.small_img}>
          <div className={styles.small_img_ico}>
            <div className={styles.small_img_ico_wrap}>
              <Image alt="no image" src={props.icon} width={24} height={24} />
            </div>
          </div>
        </li>
      )}
      {props.title && (
        <li className={styles.small_label_wrap}>
          <span className={styles.small_label}>{btnStr}</span>
        </li>
      )}
    </ul>
  )
}

/**
 * リンクなしボタン
 * @param {ButtonProps} props
 * @returns {JSX.Element} ボタンコンポーネント
 */
const commonButton = (props: ButtonProps) => {
  const stylePro = {
    fontSize: props.fontSize,
    color: props.fontColor,
    backgroundColor: props.bgColor,
    border: props.border,
    width: props.btnWidth,
    height: props.btnHeight,
  } as CSSProperties
  return (
    <button
      className={styles.small_button_wrap}
      style={stylePro}
      onClick={props.handleBtnClick || (() => {})}>
      {mainCont(props)}
    </button>
  )
}

/**
 * リンクありボタン
 * @param {ButtonProps} props
 * @returns {JSX.Element} ボタンコンポーネント
 */
const linkButton = (props: ButtonProps) => {
  const stylePro = {
    fontSize: props.fontSize,
    color: props.fontColor,
    backgroundColor: props.bgColor,
    border: props.border,
    width: props.btnWidth,
    height: props.btnHeight,
  } as CSSProperties
  return props.link ? (
    <Link href={props.link}>
      <div className={styles.link} style={stylePro}>
        {mainCont(props)}
      </div>
    </Link>
  ) : null
}

/**
 * 非活性ボタン
 * @param {ButtonProps} props
 * @returns {JSX.Element} ボタンコンポーネント
 */
const disabledBtn = (props: ButtonProps) => {
  const stylePro = {
    fontSize: props.fontSize,
    color: props.fontColor,
    backgroundColor: props.bgColor,
    border: props.border,
    width: props.btnWidth,
    height: props.btnHeight,
    opacity: 0.6,
  } as CSSProperties
  return (
    <div>
      <div className={styles.disabled_button} style={stylePro}>
        {mainCont(props)}
      </div>
    </div>
  )
}

/**
 * 引数に従ってボタンを表示し分ける
 * @param {ButtonProps} props
 * @returns {JSX.Element} ボタンコンポーネント
 */
export const Button = (props: ButtonProps) => {
  if (props.disable) {
    return disabledBtn(props)
  } else if (props.link) {
    return <div className={styles.button}>{linkButton(props)}</div>
  } else {
    return <div className={styles.button}>{commonButton(props)}</div>
  }
}

export default Button