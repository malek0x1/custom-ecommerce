import {
    Sheet, SheetContent
} from "@/components/ui/sheet"
import TextField from "../TextField"
import Spinner from "../Spinner"


const Search = ({ isOpen, setIsOpen }) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent side="top" className="w-full flex flex-col ">
                <div className="py-10">
                    <TextField placeholder="Search ..." />
                </div>
                <Spinner />
            </SheetContent>
        </Sheet>
    )
}

export default Search