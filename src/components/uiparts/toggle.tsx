import styles from "./Toggle.module.scss"
import { CSSProperties } from "react"

type ToggleProps = {
  state: boolean
  handleClick: (active: boolean) => void
  onStr: string
  offStr: string
  bgColor?: string //トグルの背景色変更
  fontColr?: string //文字色変更
  fontSize?: string //文字サイズ変更
  inside?: boolean //トグル内部にON/OFFの文字を表示するか
  isActive?: boolean //非活性
  toggleWidth?: string //トグルのON/OFFを含んだ横幅
}
/**
 * トグルの生成
 * @param item
 * @returns
 */
export const Toggle = (item: ToggleProps) => {
  const togglePro = {
    "--toggle-width": item.toggleWidth,
    "--font-color": item.fontColr,
    "--font-size": item.fontSize,
  } as CSSProperties
  const stylePro = {
    "--main-food-fd-02": item.bgColor,
  } as CSSProperties
  let outLabel
  if (!item.inside) {
    if (item.state) {
      outLabel = <label className={styles.on_off_label}>{item.onStr}</label>
    } else {
      outLabel = <label className={styles.on_off_label}>{item.offStr}</label>
    }
  }
  //非活性の時のフラグ管理
  let disabledFlg = false
  if (item.isActive == false) {
    disabledFlg = true
  }
  return (
    <div className={styles.toggleLabel} style={togglePro}>
      {outLabel}
      <label className={styles.switch}>
        <div className={disabledFlg ? styles.disabled : ""}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={item.state}
            onChange={() => item.handleClick(!item.state)}
            disabled={disabledFlg}
          />

          <div className={styles.toggle_thumb} style={stylePro}>
            <div></div>
            {item.inside && <div className={styles.inside_on_label}>{item.onStr}</div>}
            {item.inside && <div className={styles.inside_off_label}>{item.offStr}</div>}
          </div>
        </div>
      </label>
    </div>
  )
}

export default Toggle