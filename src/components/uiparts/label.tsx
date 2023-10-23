import styles from "./Label.module.scss"
import { CSSProperties } from "react"
import Image from "next/image"
type LabelProps = {
  title?: string
  icoSrc?: string
  handleIcoClick?: () => void // アイコンをクリックした時の動作
  heightPx?: string //ラベルの高さ変更
  fontSize?: string //文字サイズ変更
  fontColor?: string //文字色変更
}

/**
 * ラベルコンポーネント生成
 * @param item タイトル、アイコン画像、アイコンクリック時の処理、CSSスタイル
 * @return HTML
 */
export const returnLabel = (item: LabelProps) => {
  const stylePro = {
    "--label-height": item.heightPx,
    "--font-color": item.fontColor,
    "--font-size": item.fontSize,
  } as CSSProperties

  return (
    <div className={styles.label_wrap} style={stylePro}>
      <ul className={styles.item_label}>
        {item.icoSrc && (
          <li className={styles.img}>
            <div
              className={item.title ? styles.img_ico_wrap : styles.img_ico_wrap_notxt}
              onClick={() => item.handleIcoClick && item.handleIcoClick()}>
              <Image alt="" src={item.icoSrc} width={22} height={18} className={styles.img_ico} />
            </div>
          </li>
        )}
        {item.title && (
          <li className={styles.item_label_wrap}>
            <span className={styles.item_label}>{item.title}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export const Label = (item: LabelProps) => <div className={styles.label}>{returnLabel(item)}</div>

export default Label