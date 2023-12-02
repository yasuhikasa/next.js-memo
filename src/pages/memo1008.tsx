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


// import React, { useEffect } from 'react';
// import { isLocalhost } from '@/pages/utils/ua';


// const Test:React.FC =()=> {

//   useEffect(() => {
//     isLocalhost();
//   }, []);

//   console.log("result",isLocalhost());

//   return (
//     <div>
//       Enter your code here
//     </div>
//   );
// }

// export default Test;

// pages/index.tsx
import { getClientIp, isLocalhost } from '@/pages/utils/localhost';
import { NextPage } from 'next';

const HomePage:NextPage = ({ ip, isLocal }: { ip: string; isLocal: boolean }) => {
  return (
    <div>
      <p>クライアントのIPアドレス: {ip}</p>
      <p>ローカルホスト: {isLocal ? 'はい' : 'いいえ'}</p>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const ip = getClientIp(context.req);
  const isLocal = isLocalhost(context.req);

  return {
    props: {
      ip,
      isLocal
    }
  };
};

export default HomePage;
