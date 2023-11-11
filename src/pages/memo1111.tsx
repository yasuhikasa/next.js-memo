// pages/warmup.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Warmup: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const urls: string[] = [
    '/page/common',
    '/page1',
    '/page2',
    // ... その他のURL
  ];

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '800px';   // 幅を800pxに設定
    iframe.style.height = '480px';  // 高さを480pxに設定
    iframe.style.opacity = '0';     // 透明に設定
    iframe.style.top = '500px';     // 上から500pxの位置
    iframe.style.left = '0px';      // 左端から0pxの位置

    const loadPage = (url: string) => {
      // const iframe = document.createElement('iframe');
      // iframe.style.display = 'none'; // iframeを非表示に
      iframe.src = url;
      iframe.onload = () => {
        if (currentIndex < urls.length - 1) {
          setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
        } else {
          // ウォームアッププロセスの終了後にページ遷移
          router.push('/page/common/0g?warmup=true');
        }
      };
      document.body.appendChild(iframe);
    };

    if (urls[currentIndex]) {
      loadPage(urls[currentIndex]);
    }
  }, [currentIndex]);

// モニタ表示領域は黒画面を表示
return (
  <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
    {/* 黒画面 */}
  </div>
  );
};
// もしくは画面部分はreturn null;

export default Warmup;


// ロード失敗時の再試行を実装する例

// // pages/warmup.tsx
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const Warmup: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [retryCount, setRetryCount] = useState(0); // リトライカウントを追加
//   const router = useRouter();
//   const urls: string[] = [
//     '/page/common/0g?warmup=start', // ウォームアップの開始リクエスト
//     '/page1',
//     '/page2',
//     // ... その他のURL
//   ];

//   const loadPage = (url: string, retry: number) => {
//     const iframe = document.createElement('iframe');
//     iframe.style.position = 'absolute';
//     iframe.style.width = '800px';
//     iframe.style.height = '480px';
//     iframe.style.opacity = '0';
//     iframe.style.top = '500px';
//     iframe.style.left = '0px';
//     iframe.src = url;

//     iframe.onload = () => {
//       setRetryCount(0); // 成功したのでリトライカウントをリセット
//       setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
//     };

//     iframe.onerror = () => {
//       if (retry < 3) { // 最大3回までリトライ
//         setRetryCount(retry + 1);
//         setTimeout(() => loadPage(url, retry + 1), 1000); // 1秒後に再試行
//       }
//     };

//     document.body.appendChild(iframe);
//   };

//   useEffect(() => {
//     if (urls[currentIndex]) {
//       loadPage(urls[currentIndex], retryCount);
//     } else if (currentIndex >= urls.length) {
//       // ウォームアッププロセスの終了後にページ遷移
//       router.push('/page/common/0g?warmup=true');
//     }
//   }, [currentIndex, retryCount]);

//   // モニタ表示領域は黒画面を表示
//   return (
//     <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
//       {/* 黒画面 */}
//     </div>
//   );
// };

// export default Warmup;






// 別のコードパターン
// // pages/warmup.tsx
// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const Warmup = () => {
//   const router = useRouter();
//   const urls = [
//     '/page/common/0g?warmup=start', // ウォームアップの開始リクエスト
//     '/page1',
//     '/page2',
//     // ... その他のURL
//   ];

//   useEffect(() => {
//     let loadedCount = 0;
//     const maxRetries = 3; // 最大リトライ回数

//     const loadPage = (url, retries = 0) => {
//       const iframe = document.createElement('iframe');
//       iframe.style.position = 'absolute';
//       iframe.style.width = '800px';
//       iframe.style.height = '480px';
//       iframe.style.opacity = '0';
//       iframe.style.top = '500px';
//       iframe.style.left = '0px';
//       iframe.src = url;

//       iframe.onload = () => {
//         loadedCount++;
//         if (loadedCount === urls.length) {
//           // ウォームアッププロセスの終了後にページ遷移
//           router.push('/page/common/0g?warmup=true');
//         }
//       };

//       iframe.onerror = () => {
//         if (retries < maxRetries) {
//           console.log(`Retrying ${url}, attempt ${retries + 1}`);
//           setTimeout(() => loadPage(url, retries + 1), 1000);
//         }
//       };

//       document.body.appendChild(iframe);
//     };

//     urls.forEach(url => loadPage(url));
//   }, []);

//   return (
//     <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
//       {/* 黒画面 */}
//     </div>
//   );
// };

// export default Warmup;
