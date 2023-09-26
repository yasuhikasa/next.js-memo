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
