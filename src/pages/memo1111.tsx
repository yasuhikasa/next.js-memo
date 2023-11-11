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
  }, [currentIndex, urls, router]);

// モニタ表示領域は黒画面を表示
return (
  <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
    {/* 黒画面 */}
  </div>
  );
};

export default Warmup;


// ロード失敗時の再試行を実装する例

// useEffect(() => {
//   const iframe = document.createElement('iframe');
//   // ... iframeのスタイル設定 ...

//   const loadPage = (url: string, retryCount: number = 0) => {
//     iframe.src = url;
//     iframe.onload = () => {
//       setTimeout(() => {
//         if (currentIndex < urls.length - 1) {
//           setCurrentIndex(currentIndex + 1);
//         } else {
//           router.push('/wait-screen' + '?warmup=true');
//         }
//       }, 100);
//     };

//     iframe.onerror = () => {
//       if (retryCount < 3) { // 最大3回までリトライ
//         setTimeout(() => loadPage(url, retryCount + 1), 500); // 500ms後に再試行
//       }
//     };
//   };

//   if (urls[currentIndex]) {
//     loadPage(urls[currentIndex]);
//   }

//   document.body.appendChild(iframe);
//   return () => {
//     document.body.removeChild(iframe);
//   };
// }, [currentIndex, urls, router]);
