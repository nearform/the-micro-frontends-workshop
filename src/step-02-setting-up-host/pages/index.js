import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import LayoutBox from '../components/nextjs-layout-box';

const ReactRemoteComponent = dynamic(() => import('remote/Button'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js App</title>
        <meta name="description" content="Generated by Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutBox>
        <main className={styles.main}>
          <h1 className={styles.title}>
            This is Next.js App wrapped <br />in its own LayoutBox
          </h1>
          <ReactRemoteComponent />
        </main>
      </LayoutBox>

    </div>
  );
}
