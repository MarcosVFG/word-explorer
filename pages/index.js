import Head from 'next/head';
import WordCard from '../components/WordCard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Word Explorer</title>
        <meta name="description" content="Explore English words and their definitions" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
      </Head>

      <main>
        <WordCard />
      </main>
    </div>
  );
}