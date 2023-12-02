import { NextPage } from 'next';
import { useState, useEffect } from 'react';

interface HomeProps {
  initialCsrfToken: string;
}

const Home: NextPage<HomeProps> = ({ initialCsrfToken }) => {
  const [csrfToken, setCsrfToken] = useState<string>(initialCsrfToken);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('https://api.example.com/getCsrfToken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Failed to update CSRF token:', error);
      }
    }, 3600000); // 1時間ごとに更新

    return () => clearInterval(interval);
  }, []);

  return (
    <form action="/submit" method="post">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;

export async function getServerSideProps() {
  const csrfToken: string = await fetchCsrfTokenFromApi();
  return {
    props: {
      initialCsrfToken: csrfToken,
    },
  };
}

async function fetchCsrfTokenFromApi(): Promise<string> {
  const response = await fetch('https://api.example.com/getCsrfToken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.csrfToken;
}
