// import { ReactNode, useLayoutEffect, useRef, CSSProperties, useEffect } from "react"
// import styles from "./Layout.module.scss"
// import * as def from "@/definitions/def"

// type LayoutProps = {
//   children?: ReactNode // 画面表示コンテンツ
// }

// const useIsomorphicEffect = () => {
//   return typeof window !== "undefined" ? useLayoutEffect : useEffect
// }

// /**
//  * レイアウトコンポーネント
//  * @param {LayoutProps} children
//  * @returns {JSX.Element} レイアウトコンポーネント
//  */
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null)
//   const isomorphicEffect = useIsomorphicEffect()

//   isomorphicEffect(() => {
//     //UA取得
//     const ua = window.navigator.userAgent
//     //画面の縦幅横幅取得
//     const windowHeight = window.innerHeight
//     const windowWidth = window.innerWidth

//     const yScale = windowHeight / def.VIEW_HEIGHT
//     const xScale = windowWidth / def.VIEW_WIDTH
//     let minScale = xScale
//     if (minScale > yScale) {
//       minScale = yScale
//     }
//     //クラウジュとドアホンの場合はscale入れない
//     //スマホの場合はアスペクト比そのまま
//     //自モニタの場合はアスペクト比そのまま、左寄せ
//     if (ua.match(def.SELF_MONITOR) || ua.match(def.HOME)) {
//       inputElement.current.style.transform = "scale(" + minScale + ")"
//       //左寄せにするために、横幅を計算。右からその長さを指定
//       const nowWidth = minScale * def.VIEW_WIDTH
//       if (nowWidth != windowWidth) {
//         inputElement.current.style.marginRight = windowWidth - nowWidth + "px"
//       }
//     } else if (!ua.match(def.DOOR) && !ua.match(def.CLOUDGE)) {
//       //ドアホンとクラウジュ以外
//       inputElement.current.style.transform = "scale(" + minScale + ")"
//     } else {
//       //ドアホンとクラウジュは800*480なので、何もしない
//     }
//   })

//   return (
//     <div className={styles.container}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Layout







// スマホの場合に余白を黒帯にする
// Layout.tsx
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);  // `isMobile` ステートを追加
//   const isomorphicEffect = useIsomorphicEffect();

//   isomorphicEffect(() => {
//     // UA取得
//     const ua = window.navigator.userAgent.toLowerCase();  // toLowerCaseを追加して、大文字/小文字を区別しないようにする
//     // 画面の縦幅横幅取得
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;

//     const yScale = windowHeight / def.VIEW_HEIGHT;
//     const xScale = windowWidth / def.VIEW_WIDTH;
//     let minScale = xScale;
//     if (minScale > yScale) {
//       minScale = yScale;
//     }

//     if (ua.match(def.SELF_MONITOR) || ua.match(def.HOME)) {
//       // ...
//     } 
//     else if (ua.match(def.DOOR) || ua.match(def.CLOUDGE)) {
//       // ...
//     } 
//     else if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       const yScaleOnly = windowHeight / def.VIEW_HEIGHT;
//       inputElement.current.style.transform = `scale(${yScaleOnly})`;
//       setIsMobile(true);  // `isMobile` を true に設定
//     } 
//     else {
//       // ...
//     }
//   });

//   return (
//     <div 
//       className={styles.container}
//       style={{ backgroundColor: isMobile ? 'black' : '#f3f4f6' }}  {/* `isMobile` に基づいて背景色を動的に変更 */}
//     >
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Layout;



// もう一つのやり方
// Layout.module.scss

// .mobileBackground {
//   background-color: black;
// }


// Layout.tsx
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const isomorphicEffect = useIsomorphicEffect();

//   isomorphicEffect(() => {
//     const ua = window.navigator.userAgent.toLowerCase();

//     if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       // ...
//       setIsMobile(true);
//     } else {
//       setIsMobile(false);
//     }
//   });

//   const containerClass = `${styles.container} ${isMobile ? styles.mobileBackground : ''}`;

//   return (
//     <div className={containerClass}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Layout;
