// import Link from "next/link"
// import FooterCol from "./FooterCol"
// import TextField from "../TextField"
// import { CircleArrowRight } from "lucide-react"

// const Footer = () => {
//     const handleNewsLetter = () => {
//         alert("SUBMITED")

//     }
//     return (
//         <div className='bg-gray-50'>
//             <div className="container">
//                 <div
//                     style={{ maxWidth: "500px" }}
//                     className="flex py-4 m-auto justify-center w-full flex-col gap-3">
//                     <p className='text-center text-md mb-2'>Join Our Newsletter</p>
//                     <div className="flex w-full relative">
//                         <TextField type='email' placeholder='Email Address' />
//                         <div className="absolute right-3 top-3 cursor-pointer" onClick={handleNewsLetter}>
//                             <CircleArrowRight size={20} />
//                         </div>

//                     </div>
//                 </div>

//                 <div className="mt-8 flex flex-wrap justify-between gap-6">
//                     <FooterCol title="About us" >
//                         <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est porro deleniti nulla dicta fuga. Suscipit magni alias voluptatem dolore blanditiis, sapiente officia aliquid obcaecati, libero molestias illo doloribus quod! Fuga.</p>
//                     </FooterCol>

//                     <FooterCol title="Usefull Links">
//                         {["Login", "Signup", "About us", "Privacy Polics", "Return Policy"].map(item =>
//                             <Link prefetch={false} key={item} href={`/${item}`} className='text-xs underline block mb-2'>
//                                 {item}
//                             </Link>
//                         )}
//                     </FooterCol>
//                     <FooterCol title="Social Media" >
//                         {["Tiktok", "Instagram", "Facebook", "Twitter"].map(item =>
//                             <Link prefetch={false} key={item} href={`/${item}`} className='text-xs underline block mb-2'>
//                                 {item}
//                             </Link>
//                         )}
//                     </FooterCol>
//                     <FooterCol title="About us" >
//                         <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est porro deleniti nulla dicta fuga. Suscipit magni alias voluptatem dolore blanditiis, sapiente officia aliquid obcaecati, libero molestias illo doloribus quod! Fuga.</p>
//                     </FooterCol>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Footer

import Link from "next/link";
import FooterCol from "./FooterCol";
import TextField from "../TextField";
import { CircleArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllPagesSlugs } from "@/lib/helpers";
import { Rest_DEMO_NAVIGATION_2 } from "@/lib/data";
import NewsLetterForm from "../NewsLetter";
import Spinner from "../Spinner";

const Footer = ({ isSettingsLoading, settings }) => {
    const [pages, setPages] = useState(null)

    useEffect(() => {
        const fetchPages = async () => {
            const pages = await getAllPagesSlugs()
            setPages(pages)
        }
        fetchPages()
    }, [])

    return (
        <div className='bg-gray-50 py-10'>
            <div className="container">
                <NewsLetterForm />

                <div className="mt-8 flex flex-wrap justify-between gap-6">
                    <FooterCol title="About us" >
                        {isSettingsLoading
                            ?
                            <Spinner color="black" />
                            :
                            <p className="text-xs text-gray-600">{settings.about_us}</p>


                        }
                    </FooterCol>
                    <FooterCol title="Usefull Links">
                        {pages && pages.length > 0 && pages.map(item => {
                            if (item.slug.current !== "home-page") {
                                return <Link prefetch={false} key={item.slug.current} href={`/pages/${item.slug.current}`} className='text-xs underline block mb-2 w-fit'>
                                    {item.title}
                                </Link>
                            } else {
                                return null
                            }
                        }
                        )}
                        {Rest_DEMO_NAVIGATION_2.map(item => (
                            <Link prefetch={false} key={item.id} href={`/${item.slug}`} className='text-xs underline block mb-2 w-fit'>
                                {item.name}
                            </Link>
                        ))}
                    </FooterCol>
                    <FooterCol title="Social Media" >
                        {
                            isSettingsLoading ? <Spinner color="black" /> : settings.social_media_links.map(item =>
                                <Link prefetch={false} key={item.title} href={`${item.link}`} className='text-xs underline block mb-2 uppercase w-fit'>
                                    {item.title}
                                </Link>
                            )}
                    </FooterCol>
                    {/* <FooterCol title="About us" >
                        <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est porro deleniti nulla dicta fuga. Suscipit magni alias voluptatem dolore blanditiis, sapiente officia aliquid obcaecati, libero molestias illo doloribus quod! Fuga.</p>
                    </FooterCol> */}
                </div>
            </div>
        </div>
    );
};

export default Footer;
