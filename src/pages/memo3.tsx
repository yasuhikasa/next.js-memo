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

//     const headerStyle: CSSProperties = {
//       "--modal-width": props.modalWidth,
//       background: props.bgColor || "white",
//       borderBottom: (props.bgColor && props.bgColor !== "white") ? "none" : "2px solid green",
//     };

//     const headerTitle: CSSProperties = {
//       color: props.fontColor,
//       fontSize: props.fontSize,
//     };

//     const contStyle: CSSProperties = {
//       "--modal-height": props.modalHeight,
//       fontSize: "18px",
//       lineHeight: "120%",
//     };

//     const footerStyle: CSSProperties = {
//       "--modal-width": props.modalWidth,
//     };

//     const btnStyle: CSSProperties = {
//       "--btn-margin": props.btnMargin,
//     };

//     const btn: JSX.Element[] = [];
//     if (props.btnItems && props.btnItems.length) {
//       props.btnItems.map((item: btnItems) => {
//         btn.push(
//           <div className={styles.button} style={btnStyle} key={item.btnTitle}>
//             <Button
//               title={item.btnTitle ? [item.btnTitle] : ['']}
//               handleBtnClick={item.handleClick}
//               btnWidth={props.btnWidth ? props.btnWidth : "122px"}
//             />
//           </div>
//         );
//       });
//     }

//     return (
//       <>
//         <div className={styles.modal_all}>
//           <div className={styles.over_lay}></div>
//           <div className={styles.modal}>
//             <div className={styles.modal_header} style={headerStyle}>
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


// /* モーダルウィンドウ表示全体 */
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

// /* モーダルウィンドウ背景のオーバーレイ */
// .overlay {
//   position: absolute;
//   top: 0px;
//   bottom: 0px;
//   left: 0px;
//   right: 0px;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 101;
// }

// /* モーダル本体 */
// .modal {
//   background-color: var(--common-white);
//   border-radius: 6px 6px 6px 6px;
//   z-index: 101;
// }

// /* ヘッダーのタイトル */
// @mixin header_text {
//   width: 324px;
//   height: 22px;
//   font-weight: 400;
//   line-height: 120%;
//   font-size: 18px;
//   --header-font-color: rgba(255, 255, 255, 0.9);
//   color: var(--header-font-color);
// }

// .header_title {
//   @include header_text;
// }

// /* ヘッダーの日付 */
// .header_date {
//   @include header_text;
//   text-align: right;
// }

// /* モーダルのヘッダー */
// .modal_header {
//   --modal-width: 500px;
//   width: var(--modal-width);
//   height: 48px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 0px 16px;
//   gap: 16px;
//   background: var(--header-bg-color, white);
//   border-radius: 6px 6px 0px 0px;
//   border-bottom: var(--header-border, 2px solid green);
// }

// /* モーダル表示コンテンツ */
// .modal_cont {
//   --modal-height: 192px;
//   height: var(--modal-height);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 18px; /* Set font-size to 18px */
//   line-height: 1.2; /* Set line-height to 120% */
// }

// /* フッター(ボタン表示) */
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
