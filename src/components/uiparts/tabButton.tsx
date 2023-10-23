import styles from "./TabButton.module.scss"
import { CSSProperties } from "react"

type TabButtonItem = {
  id: number
  title: string
  active: string
  handleClick: (active: string) => void
}

export type TabButtonProps = {
  items: TabButtonItem[]
  active: string
  btnWidth: string
  btnHeight?: string
  bgColr?: string //背景色
  btnColor?: string //ボタン色
  fontColor?: string //文字色
  fontSize?: string //文字サイズ
}

/**
 * タブボタンコンポーネント生成
 * @param items ID、タイトル、アクティブ可否、クリック時の処理
 * @param active アクティブ可否
 * @return HTML
 */
export const TabButton = ({
  items,
  active,
  btnWidth,
  btnHeight,
  bgColr,
  btnColor,
  fontColor,
  fontSize,
}: TabButtonProps) => {
  if (!items) {
    return null
  }

  // タブボタンのアクティブフラグ
  let classNameFlg = true
  const btnPro = { "--btn-color": btnColor } as CSSProperties
  const stylePro = { "--btn-width": btnWidth } as CSSProperties
  const tabPro = { "--tab-btn-background": bgColr, "--tab-height": btnHeight } as CSSProperties
  const letterPro = { "--tx-lt-main": fontColor, "--font-size": fontSize } as CSSProperties

  const showTab = items.map((item: TabButtonItem) => {
    // 渡されたactive値とitemで保持しているactive値を比較し、一致した場合にactive用スタイルを適用
    classNameFlg = item.active === active ? true : false
    return (
      <li className={styles.tab} key={item.id} style={stylePro}>
        <button
          className={classNameFlg ? styles.item_tab_wrap_active : styles.item_tab_wrap}
          onClick={() => item.handleClick(item.active)}
          style={btnPro}>
          <span className={styles.item_tab} style={letterPro}>
            {item.title}
          </span>
        </button>
      </li>
    )
  })

  return (
    <ul className={styles.tabUnit} style={tabPro}>
      {showTab}
    </ul>
  )
}

export default TabButton