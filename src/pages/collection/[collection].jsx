import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CiFilter } from "react-icons/ci";
import commerce from "../../lib/commerce";
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import SkeletonCard from '@/components/Card/SkeletonCard';
import Skeleton from 'react-loading-skeleton';

const Collection = () => {
    const NUMBER_TO_FETCH = 8
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [chosenFilter, setChosenFilter] = useState({})
    const [isFilterOpened, setIsFilterOpened] = useState(false)
    const [isFullLoading, setIsFullLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const handleInitialProducts = async () => {
            setIsFullLoading(true)
            if (router.query.collection) {
                fetchProductsByCollection(router.query.collection)
            }
        }
        handleInitialProducts()
    }, [router.query, chosenFilter])

    const fetchProductsByCollection = async () => {
        try {
            const addFilters = chosenFilter.name ? { sortBy: chosenFilter.sortBy, sortOrder: chosenFilter.sortOrder } : {}
            const { data, meta } = await commerce.products.list({
                category_slug: [router.query.collection],
                limit: NUMBER_TO_FETCH,
                page: page,
                ...addFilters
            });

            setIsFullLoading(false)
            if (data) {
                setTotalProducts(meta.pagination.total)
                setProducts((prev) => [...prev, ...data]);
                setPage(page + 1);
                return
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <Layout >
            <Filter isOpen={isFilterOpened} setIsOpen={setIsFilterOpened} chosenFilter={chosenFilter} setChosenFilter={setChosenFilter} />
            <div className="custom-container">
                <div className="flex justify-between items-center sm:my-4 p-1 my-2">
                    {isFullLoading ? (
                        <Skeleton width={105} height={20} />
                    ) : (
                        <div
                            onClick={() => {
                                setIsFilterOpened(true)
                            }}
                            className="flex items-center gap-2 cursor-pointer">
                            <CiFilter size={20} />
                            <p className="text-xs font-light !text-gray-900">Filter and sort </p>
                        </div>
                    )}
                    {isFullLoading ? (
                        <Skeleton width={60} height={20} />
                    ) : (

                        <p className="text-xs font-light text-gray-900">{`${totalProducts} Products`}</p>
                    )}
                </div>

                {isFullLoading ? (
                    <div className="flex flex-wrap">
                        {[1, 2, 3, 4, 6, 7, 8, 9].map(_ => (
                            <div key={_} className="w-1/2 sm:w-1/3 md:w-1/4 px-1">
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="">
                        <InfiniteScroll
                            dataLength={products.length}
                            next={fetchProductsByCollection}
                            hasMore={hasMore}
                            loader={
                                <div className="flex flex-wrap">
                                    {[1, 2, 3, 4].map(_ => (
                                        <div key={_} className="w-1/2 sm:w-1/3 md:w-1/4 px-1">
                                            <SkeletonCard />
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            <div className="flex flex-wrap ">
                                {products.length > 0 &&
                                    products.map((product) => (
                                        <div key={product.id} className="w-1/2 sm:w-1/3 md:w-1/4 px-0.5">
                                            <Card product={product} key={product.id} />
                                        </div>
                                    ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Collection