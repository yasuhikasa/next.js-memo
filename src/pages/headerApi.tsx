// // pages/index.tsx
// import { GetServerSidePropsContext } from 'next';

// type Props = {
//   customHeader: string | null;
//   error: string | null;
// };

// const IndexPage = ({ customHeader, error }: Props) => {
//   return <div>Loading...</div>;
// };

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const customHeader = context.req.headers['app-type'] || null;
//   console.log(customHeader);

//   if (!customHeader) {
//     return {
//       props: {
//         customHeader: null,
//         error: 'App-Type header is missing',
//       },
//     };
//   }

//   if (customHeader === 'setting') {
//     context.res.writeHead(302, { Location: '/settingPage' });
//     context.res.end();
//   } else if (customHeader === 'user') {
//     context.res.writeHead(302, { Location: '/userPage' });
//     context.res.end();
//   } else {
//     context.res.writeHead(302, { Location: '/guestPage' });
//     context.res.end();
//   }

//   return { props: {} }; // この行は必要ですが、propsは空で問題ありません。
// }

// export default IndexPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

type Props = {
  customHeader: string | null;
};

const HomePage: React.FC<Props> = ({ customHeader }) => {
  const router = useRouter();

  useEffect(() => {
    if (customHeader === 'user') {
      router.push('/userPage');
    } else if (customHeader === 'setting') {
      router.push('/settingPage');
    }
  }, [customHeader]);

  return <div>Loading...</div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const customHeader = req.headers['App-Type'] as string | undefined;
  return {
    props: {
      customHeader: customHeader || null, // `undefined`の場合に`null`を返すように変更
    },
  };
};

export default HomePage;
