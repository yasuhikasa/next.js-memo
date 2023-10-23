import { useState } from "react"
import styles from "./HorizontalTabs.module.scss"
import { CSSProperties } from "react"

type HorizontalTabItem = {
  id: number // タブID
  title: string // タブタイトル
  link?: string // タブ押下時のリンク先
  selected?: boolean // タブ選択中フラグ
}

type HorizontalTabProps = {
  items: HorizontalTabItem[]
  bottomColor?: string // 下線の色
  height?: string // タブの高さ
  width?: string // タブの幅
  bgColor?: string // 背景色
  fontSize?: string // 文字サイズ
  selectedId: number // 選択中のタブID
}

/**
 * 水平タブコンポーネント
 * @param {HeaderProps} props
 * @returns {JSX.Element} 水平タブコンポーネント
 */
export const HorizontalTabs = (props: HorizontalTabProps) => {
  const [itemList, setStates] = useState(props.items)
  const [selectedFlg, setActive] = useState(props.selectedId)

  const handleClick = (id: number) => {
    itemList.forEach((items: HorizontalTabItem) => {
      items.selected = items.id === id
    })
    setStates([...itemList])
    setActive(id)
  }

  if (!props.items) {
    return null
  }

  const styleTab = {
    borderColor: props.bottomColor,
    width: props.width,
    height: props.height,
  } as CSSProperties
  const styleFont = {
    fontSize: props.fontSize,
    "--selected-font-color": props.bottomColor,
  } as CSSProperties
  const stylePro = {
    background: props.bgColor,
  } as CSSProperties

  const listItems = props.items.map((item: HorizontalTabItem) => (
    <li className={item.selected ? styles.tab_wrap_selected : styles.tab_wrap} key={item.id} style={styleTab}>
      <div className={styles.small_tab_wrap}>
        <button
          onClick={() => handleClick(item.id)}
          className={item.selected ? styles.small_tab_selected : styles.small_tab}
          style={styleFont}>
          {item.title}
        </button>
      </div>
    </li>
  ))
  return (
    <ul className={styles.tab_unit} style={stylePro}>
      {listItems}
    </ul>
  )
}

export default HorizontalTabs