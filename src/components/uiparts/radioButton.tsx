import styles from "./RadioButton.module.scss"
import { CSSProperties, useState } from "react"

// ラジオボタンコンポーネント
type RadioButtonItem = {
  id: string
  name: string
  value: string
  label: string
  state: string
  handleClick: (active: string) => void
  borderColor?: string
  bgColor?: string
  fontColor?: string //文字色
  fontSize?: string //文字サイズ
  isActive?: boolean //非活性
}
type RadioButtonProps = {
  items: RadioButtonItem[]
  active: string
  radioPadding?: string //ラジオボタン同士の間
}



export const RadioButton = ({ items, radioPadding }: RadioButtonProps) => {
  const showTab = items.map((item: RadioButtonItem) => {
    let stylePro: CSSProperties
    let disabledFlg = false
    //非活性の時のフラグ管理と色
    if (item.isActive == false) {
      stylePro = {
        "--main-food-fd-02": "#C4C4C4",
      } as CSSProperties
      disabledFlg = true
    } else {
      stylePro = {
        "--main-food-fd-02": item.borderColor,
        "--letter-color": item.bgColor,
        "--radio-padding": radioPadding,
        "--tx-lt-sub": item.fontColor,
        "--font-size": item.fontSize,
      } as CSSProperties
    }

    return (
      <div key={item.id}>
        <input
          id={item.value}
          name={item.name}
          type="radio"
          value={item.value}
          checked={item.value === item.state}
          onChange={() => item.handleClick(item.value)}
          className={styles.radio_input}
          disabled={disabledFlg}
        />
        <label className={styles.radio_label} htmlFor={item.value} style={stylePro}>
          {item.label}
        </label>
      </div>
    )
  })
  return <ul className={styles.radio}>{showTab}</ul>
}
export default RadioButton