// モーダルコンポーネント

// import Button from "./button";
// import styles from "./Modal.module.scss";
// import { useState, CSSProperties } from "react";

// type btnItems = {
//   btnTitle?: string;
//   handleClick?: () => void;
// };

// type ModalProps = {
//   title: string;
//   modalCont: JSX.Element;
//   modalWidth?: string;
//   modalHeight?: string;
//   bgColor?: string;
//   fontColor?: string;
//   fontSize?: string;
//   hdDate?: string;
//   btnWidth?: string;
//   btnMargin?: string;
//   btnItems?: btnItems[];
// };

// const Modal = () => {
//   const [show, setShow] = useState(false);

//   const openModal = () => {
//     setShow(true);
//   };

//   const closeModal = () => {
//     setShow(false);
//   };

//   const ModalCont = (props: ModalProps) => {
//     if (!show) return null;

//     const defaultColor = !props.bgColor || props.bgColor === "#ffffff";

//     const headerStyle = {
//       "--modal-width": props.modalWidth,
//       background: defaultColor ? "#ffffff" : props.bgColor,
//     } as CSSProperties;

//     const headerLineStyle = {
//       "--modal-width": props.modalWidth,
//       borderBottom: defaultColor ? "2px solid #478549" : "none",
//     } as CSSProperties;

//     const headerTitle = {
//       color: props.fontColor,
//       fontSize: props.fontSize,
//     } as CSSProperties;

//     const contStyle = {
//       "--modal-height": props.modalHeight,
//     } as CSSProperties;

//     const footerStyle = {
//       "--modal-width": props.modalWidth,
//     } as CSSProperties;

//     const btnStyle = {
//       "--btn-margin": props.btnMargin,
//     } as CSSProperties;

//     const btn: JSX.Element[] = [];
//     if (props.btnItems && props.btnItems.length) {
//       props.btnItems.map((item: btnItems) => {
//         btn.push(
//           <div className={styles.button} style={btnStyle} key={item.btnTitle}>
//             <Button
//               title={item.btnTitle ? item.btnTitle : ""}
//               handleBtnClick={item.handleClick}
//               btnWidth={props.btnWidth ? props.btnWidth : "122px"}
//             />
//           </div>
//         );
//         return item;
//       });
//     }

//     return (
//       <>
//         <div className={styles.modal_all}>
//           <div className={styles.over_lay}></div>
//           <div className={styles.modal}>
//             <div className={styles.modal_header} style={headerStyle}>
//               <div className={styles.header_line} style={headerLineStyle}></div>
//               <div className={styles.header_title} style={headerTitle}>
//                 {props.title}
//               </div>
//               <div className={styles.header_date}>{props.hdDate}</div>
//             </div>
//             <div className={styles.modal_cont} style={contStyle}>
//               {props.modalCont}
//             </div>
//             <div className={styles.footer} style={footerStyle}>
//               <div className={styles.modal_button}>{btn}</div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   return { ModalCont, openModal, closeModal };
// };

// export default Modal;


// cssモジュールの変更
// .modal_all {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .over_lay {
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   left: 0px;
//   right: 0px;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 101;
// }

// .modal {
//   background-color: var(--common-white);
//   border-radius: 6px 6px 6px 6px;
//   z-index: 101;
// }

// .modal_header {
//   --modal-width: 500px;
//   width: var(--modal-width);
//   height: 48px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 0px 16px;
//   gap: 16px;
//   position: relative;
// }

// .header_line {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: var(--modal-width);
//   height: 2px;
// }

// .header_title {
//   width: 324px;
//   height: 22px;
//   font-weight: 400;
//   line-height: 120%;
//   font-size: 18px;
//   color: var(--header-font-color, rgba(255, 255, 255, 0.9));
// }

// .header_date {
//   width: 324px;
//   height: 22px;
//   font-weight: 400;
//   line-height: 120%;
//   font-size: 18px;
//   color: var(--header-font-color, rgba(255, 255, 255, 0.9));
//   text-align: right;
// }

// .modal_cont {
//   --modal-height: 192px;
//   height: var(--modal-height);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .footer {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 8px 0px 8px 0px;
//   gap: 12px;
//   --modal-width: 500px;
//   width: var(--modal-width);
//   height: 62px;
//   background-color: var(--common-white);
//   border-radius: 0px 0px 6px 6px;
// }

// .modal_button {
//   display: flex;
// }

// .button {
//   --btn-margin: 6px;
//   margin: 0 var(--btn-margin);
// }


// 解説
// React Componentの変更:

// headerStyle, headerLineStyle, headerTitle, contStyle, footerStyle, btnStyle といった変数を使ってスタイルプロパティを動的に設定しています。これらの変数は CSSProperties タイプを持ち、条件に基づいて異なるスタイルプロパティを設定します。
// defaultColor という変数を導入し、bgColor propが提供されていない場合、または白色が指定されている場合にtrueに設定されます。これは、背景色と下線のスタイルを決定するのに使用されます。
// スタイルの変更:

// headerStyle: ヘッダーの背景色を動的に設定するために使用されます。defaultColorがtrueの場合、背景色は白に設定され、それ以外の場合はbgColor propの値に設定されます。
// headerLineStyle: ヘッダーの下線を動的に設定するために使用されます。defaultColorがtrueの場合、下線は緑色に設定され、それ以外の場合は下線は非表示になります。
// これにより、新しい仕様に従ってモーダルヘッダーの背景色と下線を動的に変更できるようになりました。もしbgColor propが提供されていれば、それに基づいてヘッダーの背景色が変わり、デフォルトの白色の背景の場合にのみ下線が表示されるようになりました。また、他の色が指定された場合は下線は非表示になります。これで、同じコンポーネントを使って、異なる背景色を持つモーダルを作成し、それに応じてヘッダーの下線の有無をコントロールできるようになりました。