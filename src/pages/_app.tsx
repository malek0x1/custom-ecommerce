import "@/styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from "next/app";
import { ContextProvider } from "@/lib/context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full">
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </div>
  )
}
