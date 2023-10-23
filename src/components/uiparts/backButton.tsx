import Image from "next/image"
import { useRouter } from "next/router"
import styles from "./backButton.module.scss"

type BackButtonProps = {
  link?: string // 戻るボタン押下時の遷移先
}

/**
 * 戻るボタンコンポーネント
 * @param {BackButtonProps} props
 * @returns {JSX.Element} 戻るボタンコンポーネント
 */
export const BackButton = (props: BackButtonProps) => {
  const router = useRouter()
  const handleBtnClick = (link: string) => {
    link = link ? link : "/"
    return router.replace(link)
  }




  return (
    <div className={styles.button}>
      <a className={styles.link}>
        <div className={styles.small_button_wrap} onClick={() => handleBtnClick(props.link || "")}>
          <ul className={styles.small_button}>
            <li className={styles.small_img}>
              <div className={styles.small_img_icon_wrap}>
                <Image alt="no image" src="/vercel.svg" width={24} height={24} />
              </div>
            </li>
            <li className={styles.small_label_wrap}>
              <span className={styles.small_label}>戻る</span>
            </li>
          </ul>
        </div>
      </a>
    </div>
  )
}

export default BackButton