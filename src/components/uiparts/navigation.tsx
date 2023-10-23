import { Label } from "@/components/label"
import styles from "./Navigation.module.scss"
import React, { useState } from "react"
import BackButton from "./backButton"
import MenuButton from "./menuButton"
import { strictEqual } from "assert"

import Image from "next/image"

// ナビの表示モード
enum NAVI_DISPLAY_MODE {
  DEFAULT, // 左側にナビゲーションを表示する
  SMALL, // 左上にナビゲーションを小さく表示する
}

const menuIcon = "/icon/icon_menu_line.svg"
const navigationItems = [
  { title: "ホーム", icon: "/icon/icon_home_line.svg" },
  { title: "ダッシュボード", icon: "/icon/icon_dashboard_line.svg" },
  { title: "タイムライン", icon: "/icon/icon_message_line.svg" },
  { title: "コントロール", icon: "/icon/icon_control_line.svg" },
  { title: "エネルギー", icon: "/icon/icon_energy_line.svg" },
  { title: "設定", icon: "/icon/icon_setting_line.svg" },
]

type NavigationProps = {
  displayMode?: NAVI_DISPLAY_MODE // ナビゲーション表示モード
}

const handleClick = (id: number) => {
  console.log(id) //ダミー関数仕様が決まったら変更する
}

/**
 * ナビゲーションコンポーネント
 * @param {NavigationProps} 表示モード
 * @returns {JSX.Element} ナビゲーションコンポーネント
 */
const Navigation = (props: NavigationProps = { displayMode: NAVI_DISPLAY_MODE.DEFAULT }) => {
  // 展開フラグ
  const [wideFlg, setWideFlg] = useState<boolean>(false)
  // 展開フラグを切り替える
  const toggleWideFlg = () => {
    setWideFlg(!wideFlg)
  }
  /**
   * DEFAULTモード表示コンテンツ
   * @param {boolean} wide 展開フラグ
   * @returns {JSX.Element} ナビゲーションHTML
   */
  const defaultNavi = (wide: boolean) => {
    return (
      <div className={props.displayMode === NAVI_DISPLAY_MODE.SMALL ? styles.ly_menu_wrap_small : styles.ly_menu_wrap}>
        <nav
          className={`${props.displayMode === NAVI_DISPLAY_MODE.SMALL ? styles.ly_menu_small : styles.ly_menu} ${
            wide ? styles.ly_menu_wide : ""
          }`}>
          {/* メニューボタン */}
          <div className={wide ? styles.menu_btn_wide : styles.menu_btn} onClick={toggleWideFlg}>
            <Image alt="" src={menuIcon} width={24} height={24} />
          </div>
          {/* 画面リンクボタン */}
          <ul>
            {navigationItems.map((item, i) => (
              <div
                key={i}
                className={wide ? styles.link_btn_container_wide : styles.link_btn_container}
                onClick={() => {
                  if (wide) handleClick(i)
                }}>
                <li className={wide ? styles.link_btn_wide : styles.link_btn}>
                  <Image alt="" src={item.icon} width={24} height={24} />
                </li>
                <li>
                  <span className={styles.link_btn_title}> {wide ? item.title : undefined} </span>
                </li>
              </div>
            ))}
          </ul>
        </nav>
        {/* 背景制御用 */}
        {props.displayMode === NAVI_DISPLAY_MODE.DEFAULT && wide && (
          <div className={styles.no_touch_area} onClick={() => setWideFlg(false)}></div>
        )}
      </div>
    )
  }
  /**
   * SMALLモード表示コンテンツ
   * @param {boolean} wide 展開フラグ
   * @returns {JSX.Element} ナビゲーションHTML
   */
  const smallNavi = (wide: boolean) => {
    return (
      <div className={styles.ly_navi}>
        <nav className={styles.navi}>
          <div className={styles.menu_btn_wrap}>
            <MenuButton handleBtnClick={toggleWideFlg} />
          </div>
          <div className={styles.back_btn_wrap}>
            <BackButton />
          </div>
        </nav>
        <div className={styles.ly_wide_full_cont}>
          {defaultNavi(wide)}
          {wide && <div className={styles.no_touch_area} onClick={() => setWideFlg(false)}></div>}
        </div>
      </div>
    )
  }

  // 呼び出し時のモードで分岐
  if (props.displayMode === NAVI_DISPLAY_MODE.DEFAULT) {
    return defaultNavi(wideFlg)
  } else if (props.displayMode === NAVI_DISPLAY_MODE.SMALL) {
    return smallNavi(wideFlg)
  }
}

export default Navigation
export { NAVI_DISPLAY_MODE }