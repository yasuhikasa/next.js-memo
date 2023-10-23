import styles from "./Header.module.scss"
import { HeaderDate } from "./uiCommon"
import Image from "next/image"

export type HeaderProps = {
  icon?: string // アイコン
  contents?: JSX.Element // 警告表示などのヘッダに表示するコンテンツ
  title: string // タイトル
}

/**
 * ヘッダコンポーネント
 * @param {HeaderProps} item
 * @returns {JSX.Element} ヘッダコンポーネント
 */
const Header = (item: HeaderProps) => {
  const date = HeaderDate()
  return (
    <header className={styles.header}>
      <h1 className={styles.header_title}>
        {item.icon && (
          <div className={styles.header_icon}>
            <Image alt="" src={item.icon} width={24} height={24} />
          </div>
        )}
        <span className={styles.header_label}>{item.title}</span>
      </h1>
      <div className={styles.header_contents}>{item.contents}</div>
      <p className={styles.header_date} suppressHydrationWarning>
        {date}
      </p>
    </header>
  )
}

export default Header