// isomorphicEffect(() => {
//   //UA取得
//   const ua = window.navigator.userAgent.toLowerCase();
//   //画面の縦幅横幅取得
//   const windowHeight = window.innerHeight;
//   const windowWidth = window.innerWidth;

//   const yScale = windowHeight / def.VIEW_HEIGHT;
//   const xScale = windowWidth / def.VIEW_WIDTH;
//   let minScale = Math.min(xScale, yScale);

//   if (ua.match(/(aiseg2|homectrl)/)) {
//       // AISEG2 or HomeCTRL case
//       inputElement.current.style.transform = "scale(" + minScale + ")";
//       const nowWidth = minScale * def.VIEW_WIDTH;
//       if (nowWidth != windowWidth) {
//           inputElement.current.style.marginRight = windowWidth - nowWidth + "px";
//       }
//   } else if (ua.match(/(pewdmshomeviewer|doorctrl)/)) {
//       // PEWDMSHomeViewer or DoorCTRL case, no changes required
//   } else if (ua.match(/(android|ipad|iphone)/)) {
//       // Android, iPad, or iPhone case
//       const yScaleOnly = windowHeight / def.VIEW_HEIGHT;
//       inputElement.current.style.transform = `scale(${yScaleOnly}, ${yScaleOnly})`;
//       inputElement.current.style.marginLeft = (windowWidth - (def.VIEW_WIDTH * yScaleOnly)) / 2 + "px";  // Center alignment
//   } else {
//       // Other cases, center alignment without fitting
//       inputElement.current.style.marginLeft = (windowWidth - def.VIEW_WIDTH) / 2 + "px";
//       inputElement.current.style.marginTop = (windowHeight - def.VIEW_HEIGHT) / 2 + "px";
//   }
// });

// return (
//   <div className={styles.container}>
//     <div className={styles.page} ref={inputElement}>
//       <div>{children}</div>
//     </div>
//   </div>
// )



// 再度メモ
// import React, { useEffect, useRef } from 'react';

// // 各種定数を定義
// const VIEW_WIDTH = 800;
// const VIEW_HEIGHT = 480;

// const Layout = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const ua = window.navigator.userAgent;
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;
//     const yScale = windowHeight / VIEW_HEIGHT;
//     const xScale = windowWidth / VIEW_WIDTH;
//     let minScale = Math.min(xScale, yScale);
//     const container = containerRef.current;

//     if (ua.match(/AISEG2|HomeCTRL/)) {
//       // 解像度: 1024x600, 縦をフィットさせ、横は左寄せ
//       const scale = windowHeight / 600;
//       container.style.transform = `scale(${scale})`;
//       container.style.marginRight = `${windowWidth - (1024 * scale)}px`;
//     } else if (ua.match(/PEWDMSHomeViewer|DoorCTRL/)) {
//       // 解像度: 800x480, 変更不要
//       // Nothing to do
//     } else if (ua.match(/android|ipad|iphone/)) {
//       // 縦をフィットさせ、横は中央揃い
//       container.style.transform = `scale(${yScale})`;
//       container.style.marginLeft = `${(windowWidth - (VIEW_WIDTH * yScale)) / 2}px`;
//     } else {
//       // 画面フィットはせず中央揃いにする
//       container.style.transform = `scale(${minScale})`;
//       container.style.marginLeft = `${(windowWidth - (VIEW_WIDTH * minScale)) / 2}px`;
//       container.style.marginTop = `${(windowHeight - (VIEW_HEIGHT * minScale)) / 2}px`;
//     }
//   }, []);

//   return (
//     <div ref={containerRef} style={{ width: VIEW_WIDTH, height: VIEW_HEIGHT }}>
//       {/* コンテンツ */}
//     </div>
//   );
// };

// export default Layout;
