import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <Head>
				<title>AlgoArena</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/logo3.png' />
				<meta
					name='description'
					content='Web application that contains coding problems'
				/>
			</Head>
			<Toaster position="top-center" reverseOrder={false} />
    <Component {...pageProps} />
    </RecoilRoot>
  );
}
