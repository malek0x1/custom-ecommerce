import FooterCol from './FooterCol'
import TextField from '../TextField'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='bg-gray-50 pb-10 pt-5'>
            <div className="container">
                <div
                    style={{ maxWidth: "500px" }}
                    className="flex py-4 m-auto justify-center w-full flex-col gap-3">
                    <p className='text-center text-md mb-2'>Join Our Newsletter</p>
                    <TextField type='email' placeholder='Email Address' />
                </div>

                <div className="mt-8 flex flex-wrap justify-between gap-6">
                    <FooterCol title="About us" >
                        <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est porro deleniti nulla dicta fuga. Suscipit magni alias voluptatem dolore blanditiis, sapiente officia aliquid obcaecati, libero molestias illo doloribus quod! Fuga.</p>
                    </FooterCol>

                    <FooterCol title="Usefull Links">
                        {["Login", "Signup", "About us", "Privacy Polics", "Return Policy"].map(item =>
                            <Link href="#" className='text-xs underline block mb-2'>
                                {item}
                            </Link>
                        )}
                    </FooterCol>
                    <FooterCol title="Social Media" >
                        {["Tiktok", "Instagram", "Facebook", "Twitter"].map(item =>
                            <Link href="#" className='text-xs underline block mb-2'>
                                {item}
                            </Link>
                        )}
                    </FooterCol>
                    <FooterCol title="About us" >
                        <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est porro deleniti nulla dicta fuga. Suscipit magni alias voluptatem dolore blanditiis, sapiente officia aliquid obcaecati, libero molestias illo doloribus quod! Fuga.</p>
                    </FooterCol>
                </div>
            </div>
        </div>
    )
}

export default Footer