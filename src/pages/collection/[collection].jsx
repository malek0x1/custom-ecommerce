import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CiFilter } from "react-icons/ci";
import commerce from "../../lib/commerce";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Image from 'next/image';

const Collection = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState(true)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const router = useRouter()
    useEffect(() => {
        const handleInitialProducts = async () => {
            if (router.query.collection) {
                fetchProductsByCollection(router.query.collection)

            }
        }
        handleInitialProducts()
    }, [router.query])
    const fetchProductsByCollection = async (collection) => {
        try {
            const { data, meta } = await commerce.products.list({
                category_slug: [collection],
                limit: 4,
                page: page,
            });
            setProducts(data);
            setTotalPages(meta.pagination.total_pages);
            setTotalProducts(meta.pagination.total);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    return (
        <Layout >
            <div className="container p-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <CiFilter size={20} />
                        <p className="text-xs font-light !text-gray-900">Filter and sort </p>
                    </div>
                    <p className="text-xs font-light text-gray-900">{`${totalProducts} Products`}</p>
                </div>


                <div className="wrapper">
                    {products.length > 0 && products.map((product) => (
                        <div key={product.id}>

                            <Image width={400} height={400} src={product.image.url} />
                            <p>{product.price.formatted_with_symbol}</p>
                        </div>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>

                        {page !== 1 &&
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => handlePageChange(page - 1)}
                                />
                            </PaginationItem>
                        }

                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index} active={page === index + 1}>
                                <PaginationLink href="#" onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {page !== totalPages && (
                            <PaginationItem >
                                <PaginationNext
                                    href="#"
                                    onClick={() => handlePageChange(page + 1)}
                                />
                            </PaginationItem>
                        )}

                    </PaginationContent>
                </Pagination>

            </div>
        </Layout>
    )
}

export default Collection