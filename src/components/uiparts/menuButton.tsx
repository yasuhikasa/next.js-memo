import Image from "next/image"
import styles from "./MenuButton.module.scss"

type BackButtonProps = {
  handleBtnClick?: () => void //ボタンをクリックした時の動作
}
/**
 *
 * @param item メニューボタン サイドバーなどを表示
 * @returns
 */
export const MenuButton = (item: BackButtonProps) => {
  return (
    <div className={styles.button}>
      <a className={styles.link}>
        <div className={styles.item_button_wrap} onClick={item.handleBtnClick ? () => item.handleBtnClick!() : () => {}}>
          <ul className={styles.item_button}>
            <li className={styles.item_img}>
              <div className={styles.item_img_ico_wrap}>
                <Image alt="menu" src="/icon/icon_menu_line.svg" width={24} height={24} />
              </div>
            </li>
          </ul>
        </div>
      </a>
    </div>
  )
}

export default MenuButton