import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen max-w-none bg-white from-zinc-200 to-transparent dark:bg-zinc-700 bg-gradient-to-br dark:from-zinc-600 dark:to-zinc-800 prose flex">
      <Head>
        <title>Frankie Ramirez</title>
        <meta
          name="description"
          content="Personal website for Frankie Ramirez"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center grow">
        <div>
          <h5 className="font-semibold animate-bounce dark:text-zinc-200">
            Hello, I&rsquo;m
          </h5>
          <h1 className="mb-4 dark:text-zinc-50">Frankie Ramirez</h1>

          <p className="mt-0 mb-4 dark:text-zinc-200">Learn more about me:</p>

          <div className="flex items-center">
            <a
              className="no-underline bg-teal-300 rounded-full py-1 px-6 text-zinc-800 shadow-lg hover:shadow-sm transition-all mr-4"
              download
              href="resume.pdf"
            >
              Resume
            </a>
            <a
              className="no-underline bg-sky-300 rounded-full py-1 px-6 text-zinc-800 shadow-lg hover:shadow-sm transition-all"
              href="https://www.linkedin.com/in/frankieramirez/"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
