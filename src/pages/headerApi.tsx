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
import { GetServerSidePropsContext, NextPage } from 'next';

type Props = {
  customHeader: string | null;
  error: string | null;
};

const IndexPage: NextPage<Props> = ({ customHeader, error }) => {
  const router = useRouter();

  useEffect(() => {
    if (!customHeader) {
      console.error(error);
    } else if (customHeader === 'user') {
      router.push('/userPage');
    } else if (customHeader === 'setting') {
      router.push('/settingPage');
    } else {
      router.push('/guestPage');
    }
  }, [customHeader]);

  return <div>Loading...</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const customHeader = context.req.headers['app-type'] || null;

  if (!customHeader) {
    return {
      props: {
        customHeader: null,
        error: 'App-Type header is missing',
      },
    };
  }

  return {
    props: {
      customHeader,
      error: null,
    },
  };
}

export default IndexPage;
