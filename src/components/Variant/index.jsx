
const Variant = ({ type, variants, chosenVariant, setChosenVariant, variantGroupId }) => {
    return (
        <div className='grid '>
            <p className="font-bold text-xs">{type}</p>
            <div className="flex items center gap-1 flex-wrap">
                {variants.map(item => (
                    <div key={item.name}
                        onClick={() => {
                            setChosenVariant(prev => ({ ...prev, [type]: { ...item, variantGroupId } }))
                        }}
                        className={`border bg-white variant-item ${chosenVariant.name == item.name && "active"}`}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Variant