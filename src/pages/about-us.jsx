import Layout from "@/components/Layout"
import { Module } from "@/components/Modules"
import Spinner from "@/components/Spinner"
import { getPageBySlug } from "@/lib/helpers"
import { useEffect, useState } from "react"
const AboutUs = () => {


    const [isFullLoading, setIsFullLoading] = useState(true)
    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        const handlePage = async () => {
            const res = await getPageBySlug("about-us")
            if (res.modules && res.modules.length > 0) {
                setPageData(res)
                console.log(res);
            }
            setIsFullLoading(false)
        }
        handlePage()
    }, [])


    return (
        <Layout
            title="About Us"
            description=""
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                {isFullLoading ? <Spinner /> : (
                    <>
                        <h2 className="uppercase text-2xl tracking-wide">{pageData.title}</h2>
                        {pageData?.modules?.map((module, key) => (
                            <Module key={key} module={module} />
                        ))}
                    </>
                )}


            </div>

        </Layout>
    )
}

export default AboutUs