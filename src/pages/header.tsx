// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const IndexPage: React.FC = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/api/receiveHeader', {
//         headers: { 'App-type': 'setting' }, // ここでカスタムヘッダーを指定します。
//       });
//       const data = await response.json();

//       router.push(data.redirectPath);
//     };

//     fetchData();
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
      // 仮定: DBから取得したデータは次のような形になっている。
      const users = [
        { id: 1, userType: 'construction' },
        { id: 2, userType: 'user' },
        // ...他のユーザーデータ
      ];

      // 仮定: 現在のユーザーのIDが1である。
      const currentUserId = 2;
      const currentUser = users.find(user => user.id === currentUserId);

      // ユーザータイプに基づいてカスタムヘッダーを設定
      const customHeader = currentUser?.userType === 'construction' ? 'setting' : 'user';

      // カスタムヘッダーを使用してAPIエンドポイントを呼び出し、遷移先のパスを取得
      const response = await fetch('/api/receiveHeader', {
        headers: { 'App-Type': customHeader },
      });
      const data = await response.json();

      // 遷移先のパスに基づいてページ遷移
      router.push(data.redirectPath);
    };

    fetchData();
  }, []);

  return <div>Loading...</div>;
};

export default IndexPage;
