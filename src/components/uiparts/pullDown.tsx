import React, { useState, CSSProperties } from "react"
import styles from "./PullDowns.module.scss"

export type PullDownItem = {
  id: number
  title: string
  select: boolean
}

export type PullDownProps = {
  items: PullDownItem[]
  active: boolean
  pullDownColor?: string //プルダウンの色を変えたい時の指定 なければデフォルトの緑っぽい色
}

/**
 * プルダウンコンポーネント生成
 * @param items ID、タイトル、セレクト可否
 * @param active アクティブ可否
 * @return HTML
 */
export const PullDowns = ({ items,active, pullDownColor }: PullDownProps) => {
  const [itemList, setStates] = useState(items)

  const handleClick = (id: number) => {
    itemList.forEach((items) => {
      items.select = items.id == id
    })
    setStates([...itemList])
  }


  if (!items) {
    return null
  }
  const stylePro = { "--main-food-fd-02 ": pullDownColor } as CSSProperties

  const listItems = itemList.map((item: PullDownItem) => (
    <li className={item.select ? styles.pullDown_wrap_select : styles.pullDown_wrap} key={item.id} style={stylePro}>
      <div className={styles.item_PullDown_wrap}>
        <button onClick={() => handleClick(item.id)} className={styles.item_PullDown} style={stylePro}>
          {item.title}
        </button>
      </div>
    </li>
  ))

  return (
    <div className={active ? styles.pullDownUnit_wrap_active : styles.pullDownUnit_wrap_inActive}>
      <ul className={styles.pullDownUnit}>{listItems}</ul>
    </div>
  )
}

export default PullDowns