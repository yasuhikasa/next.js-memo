// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const IndexPage: React.FC = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const customHeader = 'construction'; // ここでカスタムヘッダーの値をセットします。仮に施工者であると仮定します。

//     // カスタムヘッダーの値に基づいて遷移先のパスを決定
//     let redirectPath = '/guestPage'; // デフォルトの遷移先をゲストページとする
//     if (customHeader === 'construction') {
//       redirectPath = '/constructionPage';
//     } else if (customHeader === 'user') {
//       redirectPath = '/userPage';
//     }

//     // 遷移先のパスに基づいてページ遷移
//     router.push(redirectPath);
//   }, []);

//   return <div>Loading...</div>;
// };

// export default IndexPage;


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/simple');
      const customHeader = response.headers.get('x-custom-header'); // カスタムヘッダーを取得

      // カスタムヘッダーの値に基づいて遷移先のパスを決定
      let redirectPath = '/guestPage';
      if (customHeader === 'construction') {
        redirectPath = '/constructionPage';
      } else if (customHeader === 'user') {
        redirectPath = '/userPage';
      }

      // 遷移先のパスに基づいてページ遷移
      router.push(redirectPath);
    };

    fetchData();
  }, []);

  return <div>Loading...</div>;
};

export default IndexPage;
