// import { isLocalhost } from '@/path_to_your_localhost_check_function'; // 適切なパスに修正してください



// useEffect(() => {
//   const result = isLocalhost(); // localhostからのアクセスか確認

//   if (result) {
//     // 自モニタなのでUIパーツのスクロールを非表示
//     inputElement.current.style.display = "none";
//   } else {
//     // 自モニタ以外UIパーツのスクロールを表示
//     inputElement.current.style.display = "block";
//     parentElement.current.style.overflow = "hidden";
//     // タッチイベント無効化
//     window.addEventListener("touchend", noTouch);
//     window.addEventListener("touchmove", noTouch);
//     window.addEventListener("touchcancel", noTouch);
//   }

//   // コンポーネントのアンマウント時にイベントリスナをクリーンアップ
//   return () => {
//     window.removeEventListener("touchend", noTouch);
//     window.removeEventListener("touchmove", noTouch);
//     window.removeEventListener("touchcancel", noTouch);
//   };
// }, []);
