import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import LayoutBox from '../components/nextjs-layout-box';

const Nav = dynamic(() => import('remote/Nav'), {
  ssr: false,
});

const links = [
  { url: '/', label: 'Home' },
  { url: 'https://nextjs.org/', label: 'Learn more about Next.js' },
  {
    url: 'https://webpack.js.org/concepts/module-federation/',
    label: 'Learn more about Module Federation',
  },
]

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js App</title>
        <meta name="description" content="Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutBox>        
          <h1>This is Next.js App wrapped <br />in its own LayoutBox</h1>
          <Nav links={links} />      
      </LayoutBox>

    </div>
  );
}