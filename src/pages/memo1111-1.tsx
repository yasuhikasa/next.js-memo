// pages/warmup.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Warmup: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWarmupReady, setIsWarmupReady] = useState(false);
  const router = useRouter();
  const urls: string[] = [
    '/page/common/0g?warmup=start', // ウォームアップの開始リクエスト
    '/page1',
    '/page2',
    // ... その他のURL
  ];

  // ウォームアップ開始のためのリクエスト
  useEffect(() => {
    const checkWarmupStart = async () => {
      try {
        const response = await axios.get('/page/common/0g?warmup=start');
        if (response.status === 200) {
          // ウォームアップ開始
          setIsWarmupReady(true);
        }
      } catch (error) {
        console.error('Warmup start request failed:', error);
      }
    };

    checkWarmupStart();
  }, []);

  // ウォームアップ処理
  useEffect(() => {
    if (isWarmupReady && urls[currentIndex]) {
      const loadPage = (url: string) => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '800px';   // 幅を800pxに設定
        iframe.style.height = '480px';  // 高さを480pxに設定
        iframe.style.opacity = '0';     // 透明に設定
        iframe.style.top = '500px';     // 上から500pxの位置
        iframe.style.left = '0px';      // 左端から0pxの位置
        iframe.src = url;
        iframe.onload = () => {
          setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
        };
        document.body.appendChild(iframe);
      };

      loadPage(urls[currentIndex]);
    } else if (currentIndex >= urls.length) {
      // ウォームアッププロセスの終了後にページ遷移
      router.push('/page/common/0g?warmup=true');
    }
  }, [currentIndex, isWarmupReady, urls, router]);

  // モニタ表示領域は黒画面を表示
  return (
    <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
      {/* 黒画面 */}
    </div>
  );
};

export default Warmup;



// // pages/warmup.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// const Warmup: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [retryCount, setRetryCount] = useState(0); // リトライカウントを追加
//   const [isWarmupReady, setIsWarmupReady] = useState(false);
//   const router = useRouter();
//   const urls: string[] = [
//     '/page/common/0g?warmup=start', // ウォームアップの開始リクエスト
//     '/page1',
//     '/page2',
//     // ... その他のURL
//   ];

//   // ウォームアップ開始のためのリクエスト
//   useEffect(() => {
//     const checkWarmupStart = async () => {
//       try {
//         const response = await axios.get('/page/common/0g?warmup=start');
//         if (response.status === 200) {
//           setIsWarmupReady(true);
//           setRetryCount(0); // リトライカウントをリセット
//         }
//       } catch (error) {
//         console.error('Warmup start request failed:', error);
//         if (retryCount < 3) { // 最大3回までリトライ
//           setRetryCount(retryCount + 1);
//           setTimeout(checkWarmupStart, 1000); // 1秒後に再試行
//         }
//       }
//     };

//     if (!isWarmupReady) {
//       checkWarmupStart();
//     }
//   }, [isWarmupReady, retryCount]);

//   // ウォームアップ処理
//   useEffect(() => {
//     if (isWarmupReady && urls[currentIndex]) {
//       const loadPage = (url: string) => {
//         const iframe = document.createElement('iframe');
//         iframe.style.position = 'absolute';
//         iframe.style.width = '800px';   // 幅を800pxに設定
//         iframe.style.height = '480px';  // 高さを480pxに設定
//         iframe.style.opacity = '0';     // 透明に設定
//         iframe.style.top = '500px';     // 上から500pxの位置
//         iframe.style.left = '0px';      // 左端から0pxの位置
//         iframe.src = url;
//         iframe.onload = () => {
//           setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
//         };
//         document.body.appendChild(iframe);
//       };

//       loadPage(urls[currentIndex]);
//     } else if (currentIndex >= urls.length) {
//       // ウォームアッププロセスの終了後にページ遷移
//       router.push('/page/common/0g?warmup=true');
//     }
//   }, [currentIndex, isWarmupReady, urls, router]);

//   // モニタ表示領域は黒画面を表示
//   return (
//     <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
//       {/* 黒画面 */}
//     </div>
//   );
// };

// export default Warmup;
