// その１
// import { ReactNode, useLayoutEffect, useRef, useEffect } from "react"
// import styles from "./Layout.module.scss"
// import * as def from "@/definitions/def"

// type LayoutProps = {
//   children?: ReactNode // 画面表示コンテンツ
// }

// const useIsomorphicEffect = () => {
//   return typeof window !== "undefined" ? useLayoutEffect : useEffect
// }

// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null)
//   const isomorphicEffect = useIsomorphicEffect()

//   isomorphicEffect(() => {
//     const ua = window.navigator.userAgent.toLowerCase();  // toLowerCase() for case insensitive matching
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;

//     const yScale = windowHeight / def.VIEW_HEIGHT;
//     const xScale = windowWidth / def.VIEW_WIDTH;
//     let minScale = xScale < yScale ? xScale : yScale;  // Simplified min scale calculation

//     if (ua.includes(def.SELF_MONITOR.toLowerCase()) || ua.includes(def.HOME.toLowerCase())) {
//       inputElement.current.style.transform = `scale(${minScale})`;
//       const nowWidth = minScale * def.VIEW_WIDTH;
//       if (nowWidth !== windowWidth) {
//         inputElement.current.style.marginRight = `${windowWidth - nowWidth}px`;
//       }
//     } 
//     else if (ua.includes(def.DOOR.toLowerCase()) || ua.includes(def.CLOUDGE.toLowerCase())) {
//       // Nothing to do as the resolution is the same
//     } 
//     else if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       inputElement.current.style.transform = `scale(${minScale})`;
//       const excessWidth = windowWidth - (minScale * def.VIEW_WIDTH);
//       inputElement.current.style.marginLeft = `${excessWidth / 2}px`;  // Center alignment
//       inputElement.current.style.marginRight = `${excessWidth / 2}px`;  // Center alignment
//     } 
//     else {
//       // Center alignment for others
//       const excessWidth = windowWidth - def.VIEW_WIDTH;
//       const excessHeight = windowHeight - def.VIEW_HEIGHT;
//       inputElement.current.style.marginLeft = `${excessWidth / 2}px`;
//       inputElement.current.style.marginTop = `${excessHeight / 2}px`;
//     }
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Layout;


//その２
// import { ReactNode, useLayoutEffect, useRef, useEffect } from "react";
// import styles from "./Layout.module.scss";
// import * as def from "@/definitions/def";

// type LayoutProps = {
//   children?: ReactNode; // 画面表示コンテンツ
// };

// const useIsomorphicEffect = () => {
//   return typeof window !== "undefined" ? useLayoutEffect : useEffect;
// };

// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null);
//   const isomorphicEffect = useIsomorphicEffect();

//   isomorphicEffect(() => {
//     const ua = window.navigator.userAgent.toLowerCase();  // toLowerCase() for case insensitive matching
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;

//     const yScale = windowHeight / def.VIEW_HEIGHT;
//     const xScale = windowWidth / def.VIEW_WIDTH;
//     let minScale = xScale < yScale ? xScale : yScale;  // Simplified min scale calculation

//     if (ua.includes(def.SELF_MONITOR.toLowerCase()) || ua.includes(def.HOME.toLowerCase())) {
//       inputElement.current.style.transform = `scale(${minScale})`;
//       const nowWidth = minScale * def.VIEW_WIDTH;
//       if (nowWidth !== windowWidth) {
//         inputElement.current.style.marginRight = `${windowWidth - nowWidth}px`;
//       }
//     } 
//     else if (ua.includes(def.DOOR.toLowerCase()) || ua.includes(def.CLOUDGE.toLowerCase())) {
//       // Nothing to do as the resolution is the same
//     } 
//     else if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       const yScaleOnly = windowHeight / def.VIEW_HEIGHT;
//       inputElement.current.style.transform = `scale(${yScaleOnly})`;
//       const excessWidth = windowWidth - (yScaleOnly * def.VIEW_WIDTH);
//       inputElement.current.style.marginLeft = `${excessWidth / 2}px`;  // Center alignment
//       inputElement.current.style.marginRight = `${excessWidth / 2}px`;  // Center alignment
//       inputElement.current.style.backgroundColor = 'black'; または、containerElement.current.style.backgroundColor = 'black';
//     } 
//     else {
//       // Center alignment for others
//       const excessWidth = windowWidth - def.VIEW_WIDTH;
//       const excessHeight = windowHeight - def.VIEW_HEIGHT;
//       inputElement.current.style.marginLeft = `${excessWidth / 2}px`;
//       inputElement.current.style.marginTop = `${excessHeight / 2}px`;
//     }
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Layout;




// その３
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null);
//   const containerElement = useRef(null);
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
//       inputElement.current.style.transform = "scale(" + minScale + ")";
//       const nowWidth = minScale * def.VIEW_WIDTH;
//       if (nowWidth != windowWidth) {
//         inputElement.current.style.marginRight = windowWidth - nowWidth + "px";
//       }
//     } 
//     else if (ua.match(def.DOOR) || ua.match(def.CLOUDGE)) {
//       // 何もしない
//     } 
//     else if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       const yScaleOnly = windowHeight / def.VIEW_HEIGHT;
//       inputElement.current.style.transform = `scale(${yScaleOnly})`;
//       containerElement.current.style.backgroundColor = 'black';  // 黒帯を設定
//     } 
//     else {
//       // その他のデバイスの場合、中央揃えにする
//       inputElement.current.style.transform = "scale(" + minScale + ")";
//     }
//   });

//   return (
//     <div className={styles.container} ref={containerElement}>  {/* refを追加 */}
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

// その４
// Layout.tsx
// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);
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
//       inputElement.current.style.transform = `scale(${yScaleOnly}, ${yScaleOnly})`;
//       setIsMobile(true);  // `isMobile` を true に設定
//     } 
//     else {
//       // その他のケースでは、拡縮を行わず、中央揃えにする
//       inputElement.current.style.transform = 'none';
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


// その５
// import { ReactNode, useLayoutEffect, useRef, CSSProperties, useEffect, useState } from "react"
// import styles from "./Layout.module.scss"
// import * as def from "@/definitions/def"

// type LayoutProps = {
//   children?: ReactNode // 画面表示コンテンツ
// }

// const useIsomorphicEffect = () => {
//   return typeof window !== "undefined" ? useLayoutEffect : useEffect
// }

// const Layout = ({ children }: LayoutProps) => {
//   const inputElement = useRef(null)
//   const isomorphicEffect = useIsomorphicEffect()

//   isomorphicEffect(() => {
//     //UA取得
//     const ua = window.navigator.userAgent.toLowerCase();  // toLowerCaseを追加して、大文字/小文字を区別しないようにする
//     //画面の縦幅横幅取得
//     const windowHeight = window.innerHeight
//     const windowWidth = window.innerWidth

//     const yScale = windowHeight / def.VIEW_HEIGHT
//     const xScale = windowWidth / def.VIEW_WIDTH
//     let minScale = xScale
//     if (minScale > yScale) {
//       minScale = yScale
//     }
//     //以前の条件を保持しつつ、新しい条件を追加
//     if (ua.includes("aiseg2") || ua.includes("homectrl")) {
//       // ... 以前のロジック
//     } 
//     else if (ua.includes("pewdmshomeviewer") || ua.includes("doorctrl")) {
//       // ... 以前のロジック
//     } 
//     else if (ua.includes("android") || ua.includes("ipad") || ua.includes("iphone")) {
//       const yScaleOnly = windowHeight / def.VIEW_HEIGHT;
//       inputElement.current.style.transform = `scale(${yScaleOnly}, ${yScaleOnly})`;
//       inputElement.current.style.marginRight = (windowWidth - (def.VIEW_WIDTH * yScaleOnly)) / 2 + "px";  // 中央揃え
//     } 
//     else {
//       // その他のケースでは、拡縮を行わず、中央揃えにする
//       inputElement.current.style.transform = 'none';
//     }
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.page} ref={inputElement}>
//         <div>{children}</div>
//       </div>
//     </div>
//   )
// }

// export default Layout
