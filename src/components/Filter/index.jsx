import Button from "../Button"
import { SORTBY_OPTIONS } from "@/lib/data"
import { useState } from "react"
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet"
const Filter = ({ chosenFilter, setChosenFilter, isOpen, setIsOpen }) => {

    const [filterData, setFilterData] = useState({})

    const handleChange = (e) => {
        const { value } = e.target
        const [getChosenFilterItem] = SORTBY_OPTIONS.filter(item => item.name == value)
        setFilterData(getChosenFilterItem);
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent side="bottom" className="w-full flex flex-col ">
                <SheetTitle>Sort By</SheetTitle>
                <div className="py-3  grid gap-3">
                    <select className="p-2.5 w-full"
                        name="sort"
                        onChange={handleChange}
                        value={filterData.name}
                    >
                        {SORTBY_OPTIONS.map(item => (
                            <option key={item.id} name={item.query}>{item.name}</option>
                        ))}
                    </select>
                    <Button label="Apply Filter" onClick={() => {
                        setChosenFilter(filterData)
                        setIsOpen(false)
                    }} />
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default Filter