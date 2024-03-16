import { Inter } from "next/font/google";
import { useEffect } from "react";
import commerce from "../lib/commerce"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    commerce.products.list().then(data => {
      console.log(data);

    })
  }, [])

  return (
    <main className={`min-h-screen ${inter.className}`}>

    </main>
  );
}
