import React from 'react'
import { Inter } from "next/font/google";
import MetaData from "../MetaData/index"
import Footer from "../Footer/index"

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ title, description, keywords, children }) => {
    return (
        <>
            <MetaData
                description={description}
                keywords={keywords}
                title={title}
            />
            <main className={`min-h-screen ${inter.className}`}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout