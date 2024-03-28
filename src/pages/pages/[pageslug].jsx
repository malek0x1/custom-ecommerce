import Layout from "@/components/Layout";
import { Module } from "@/components/Modules";
import { getAllPagesSlugs, getPageBySlug } from "@/lib/helpers";

const PageSlug = ({ pageData }) => {
    console.log(pageData);

    getAllPagesSlugs().then(data => {
        console.log(data);
    }).catch(e => {
        console.log(e);
    })

    return (
        <Layout
            title="About Us"
            description=""
        >
            <div
                style={pageData.isContainer ? { maxWidth: "800px", minHeight: "70vh" } : { minHeight: "70vh" }}
                className={` ${pageData.isContainer ? "container" : ""} w-full my-10 flex flex-col gap-6`}>

                <h2 className="uppercase text-2xl tracking-wide text-center">{pageData.title}</h2>
                {pageData?.modules?.map((module, key) => (
                    <Module key={key} module={module} />
                ))}
            </div>
        </Layout>
    )
}

export default PageSlug

export async function getServerSideProps({ params }) {
    const { pageslug } = params;
    console.log(params.pageslug);

    try {
        const pageData = await getPageBySlug(pageslug);
        console.log(pageData);

        if (pageData) {

            return {
                props: {
                    pageData,
                },
            };
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: `/404`,
                }
            }
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: `/404`,
            },

        };
    }
}