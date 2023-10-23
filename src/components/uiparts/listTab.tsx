import styles from "./ListTab.module.scss"
import Image from "next/image"
import { useState, CSSProperties } from "react"

type ListTabItems = {
  id: number // タブID
  title: string // タブタイトル
  icon?: string // アイコン
  selected: boolean // 選択状態
  handleClick: (id: number) => void // タブクリック時の動作
}

type ListTabProps = {
  items: ListTabItems[]
  selectedId: number // 選択中のタブID
  dispNum: number // 表示するタブ数
  width?: string // タブの幅
  height?: string // タブの高さ
  fontSize?: string // タブ文字サイズ
  fontColor?: string // タブ未選択時の文字色
  bgColor?: string // タブ選択時の背景色
  borderColor?: string // タブ選択時の枠線の色
}

const UP_DIRECTION = "up" //上へのスクロールボタン
const DOWN_DIRECTION = "down" //下へのスクロールボタン

/**
 * リストメニューコンポーネント
 * @param {ListTabProps} props
 * @returns {JSX.Element} リストメニューコンポーネント
 */
export const ListTab = (props: ListTabProps) => {
  // タブの矢印ボタン押下時にState値を変更
  const [arrow, setArrow] = useState(0)

  const [firstScroll, setScroll] = useState<ListTabItems[]>([]);


  if (!props.items) {
    return null
  }
  // リストの初期化。初期値として、IDの最小値・最大値を入れる
  let minArrow = 0
  let maxArrow = props.items.length - 1
  // タブの上方向スクロールボタン
  const listTabScrollUp = () => {
    listTabScrollFunc(UP_DIRECTION)
    setArrow(minArrow)
  }
  // タブの下方向スクロールボタン
  const listTabScrollDown = () => {
    listTabScrollFunc(DOWN_DIRECTION)
    setArrow(minArrow)
  }
  // 初期表示の作成
  const scrollItems = []
  for (let i = 0; i < props.dispNum; i++) {
    scrollItems.push(props.items[i])
  }
  // 下矢印をリストに表示
  scrollItems.push({
    id: 99,
    title: "",
    icon: "/image/image_scrollNav_bottom.svg",
    selected: false,
    handleClick: listTabScrollDown,
  })


  // タブのスクロールボタン
  function listTabScrollFunc(direction: string) {
    let scrollItems = []
    const topArrow: ListTabItems[] = [{
      id: 0,
      title: "",
      icon: "/image/image_scrollNav_top.svg",
      selected: false,
      handleClick: listTabScrollUp,
    }];

    const middleItem: ListTabItems[] = props.items.slice(0, props.dispNum);

    const bottomArrow: ListTabItems[] = [{
      id: 99,
      title: "",
      icon: "/image/image_scrollNav_bottom.svg",
      selected: false,
      handleClick: listTabScrollDown,
    }];

    // 押した方向によって表示範囲の値を変更する
    if (direction == UP_DIRECTION) {
      minArrow = minArrow - 1
    } else {
      minArrow = minArrow + 1
    }
    // 一番上、一番下以外のときは、上に矢印ボタン、下に矢印ボタン、中に表示個数-1をタブ表示する
    if (minArrow != 0) {
      maxArrow = minArrow + props.dispNum - 1
    } else {
      maxArrow = minArrow + props.dispNum
    }
    // 上の矢印を押下した場合
    // 現在表示しているタブIDの最小値と、リストのタブID最小値が一致しない場合に下矢印を表示
    if (minArrow != 0) {
      // 上矢印を表示
      topArrow.push({
        id: 0,
        title: "",
        icon: "/image/image_scrollNav_top.svg",
        selected: false,
        handleClick: listTabScrollUp,
      })
    }
    //現在表示しているタブIDの最大値と、リストのタブIDの最大値が一致しない場合に上矢印を表示
    if (maxArrow != props.items.length) {
      // 下矢印を表示
      bottomArrow.push({
        id: 99,
        title: "",
        icon: "/image/image_scrollNav_bottom.svg",
        selected: false,
        handleClick: listTabScrollDown,
      })
    }
    // タブ項目を表示。最後尾に矢印が出る場合は一つ多めに項目を表示する。
    if (maxArrow != props.items.length) {
      for (let i = minArrow; i < maxArrow; i++) {
        middleItem.push(props.items[i])
      }
    } else {
      for (let i = minArrow - 1; i < maxArrow; i++) {
        middleItem.push(props.items[i])
      }
    }
    if (bottomArrow.length != 0) {
      scrollItems = topArrow.concat(middleItem, bottomArrow)
    } else {
      scrollItems = topArrow.concat(middleItem)
    }
    setScroll(scrollItems)
  }

  // タブ選択中ブフラグ
  let selectedFlg = true
  function liftList() {
    const listItems = firstScroll.map((item) => {
      const tabStyle = {
        width: props.width,
        height: props.height,
      } as CSSProperties
      const selectedTabStyle = {
        "--selected-background": props.bgColor,
        "--selected-boder-color": props.borderColor,
      } as CSSProperties
      const tabTitleStyle = {
        "--font-size": props.fontSize,
        "--font-color": props.fontColor,
        "--selected-font-color": props.borderColor,
      } as CSSProperties

      // 渡された選択中のタブIDとitemで保持しているIDを比較し、一致した場合に選択中タブのスタイルを適用する
      if (item.id === props.selectedId) {
        selectedFlg = true
      } else {
        selectedFlg = false
      }
      if (item.icon) {
        // 矢印アイコン表示タブ
        return (
          <div className={styles.tab_box} key={item.id} style={tabStyle} onClick={() => item.handleClick(item.id)}>
            <button className={styles.tab_icon}>
              <Image src={item.icon} alt="scrollNav" width={46} height={46} />
            </button>
          </div>
        )
      } else {
        // 選択項目タブ
        return (
          <div className={styles.tab_box} key={item.id} style={tabStyle} onClick={() => item.handleClick(item.id)}>
            <div
              className={selectedFlg ? styles.item_tab_wrap_selected : styles.item_tab_wrap}
              style={selectedTabStyle}>
              <button
                className={selectedFlg ? styles.tab_title_wrap_selected : styles.tab_title_wrap}
                style={tabTitleStyle}>
                {item.title}
              </button>
            </div>
          </div>
        )
      }
    })
    // タブに表示する影のサイズ計算
    const tabHeight = props.height ? Number(props.height.substring(0, props.height.length - 2)) : 46
    const tabUnitHeight = String(tabHeight * (props.dispNum + 1) + 0) + "px"

    const listStyle = {
      width: props.width,
      height: tabUnitHeight,
    } as CSSProperties

    return (
      <div className={styles.tab_unit} style={listStyle}>
        {listItems}
      </div>
    )
  }
  return liftList()
}
export default ListTab