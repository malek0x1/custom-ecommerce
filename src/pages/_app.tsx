import "@/styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from "next/app";
import { ContextProvider } from "@/lib/context/context";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {


  return (
    <div className="w-full">
      <SessionProvider session={session}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </SessionProvider>
    </div>
  )
}
