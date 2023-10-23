import styles from "./CheckBox.module.scss"
import { useState, CSSProperties } from "react"

type CheckBoxProps = {
  name?: string // チェックボックスのタイトル
  value?: string // チェックボックスの値
  bgColor?: string // チェック時の背景色
  disable?: boolean // 非活性フラグ
  state?: boolean // チェック有無(非活性時に使用する)
  handleClick?: () => void // クリック時の動作
  indeterminate?: boolean // チェックボックスをハイフン表示する
  fontSize?: string // 文字サイズ
  fontColor?: string // 文字色
}

/**
 * チェックボックスコンポーネント
 * @param {ButtonProps} props
 * @returns {JSX.Element} チェックボックスコンポーネント
 */
export const CheckBox = (props: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const handleClickCheckbox = () => {
    setIsChecked(!isChecked)
    if (props.handleClick) {
      props.handleClick()
    }
  }

  //非活性の時のフラグ管理と色
  const disableFlg = !props.disable ? false : props.disable
  const stylePro = {
    width: "fit-content",
    "--checkBox-checked-color": props.bgColor,
    "--checkBox-font-color": props.fontColor,
    opacity: disableFlg ? 0.3 : 1.0,
  } as CSSProperties

  return (
    <div style={stylePro}>
      <label>
        <input
          name={props.name}
          type="checkbox"
          value={props.value}
          checked={!props.state ? isChecked : props.state}
          onChange={handleClickCheckbox}
          className={props.indeterminate ? styles.checkbox_input_indeterminate : styles.checkbox_input}
          disabled={disableFlg}
        />
        <div className={props.indeterminate ? styles.label_input_indeterminate : styles.label_input}>
          {props.name}&nbsp;
        </div>
      </label>
    </div>
  )
}

export default CheckBox