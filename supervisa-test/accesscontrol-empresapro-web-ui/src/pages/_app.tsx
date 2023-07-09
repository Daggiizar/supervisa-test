import { Roboto } from 'next/font/google'
import Layout from '@/layouts/mainLayout';
import type { AppProps } from 'next/app';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
