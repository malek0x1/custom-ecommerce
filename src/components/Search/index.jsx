import { Sheet, SheetContent } from "@/components/ui/sheet";
import TextField from "../TextField";
import { useEffect, useState } from "react";
import commerce from "../../lib/commerce";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Link from "next/link";

const Search = ({ isOpen, setIsOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await commerce.products.list({ query });
            setSearchResults(response.data || []);
            setError(null);
        } catch (error) {
            setError("Error searching for products. Please try again later.");
            console.error("Error searching for products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let timeoutId;
        if (query) {
            // Debounce the search function
            timeoutId = setTimeout(handleSearch, 500); // Adjust the debounce delay as needed
        } else {
            // Clear search results when query is empty
            setSearchResults([]);
        }

        // Clear timeout on component unmount or when query changes
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="top" className="w-full flex flex-col ">
                <div className="py-10">
                    <TextField onChange={(e) => setQuery(e.target.value)} placeholder="Search ..." />
                </div>
                {isLoading && <Skeleton duration={0.8} count={1} className="w-full" height={80} />}
                {error && <div className="text-red-500">{error}</div>}
                {!isLoading && searchResults.length === 0 && query !== "" && (
                    <div className="text-gray-500">No results found.</div>
                )}
                {!isLoading && searchResults.length > 0 && (
                    <div className="grid gap-8">
                        {/* Display search results here */}
                        {searchResults.map((product) => (
                            <Link onClick={() => { setIsOpen(false) }} href={`/product/${product.id}`} className="flex gap-2 items-center" key={product.id}>
                                <Image unoptimized alt="asd" src={product.image.url || "/assets/images/demo.jpg"} width="100" height="50" className="w-20 object-cover object-cover" />
                                <div className="">
                                    <p className="text-thin text-xs text-gray-700">{product.name}</p>
                                    <p className="text-thin text-xs text-gray-700">{product.price.formatted_with_symbol}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Search;
