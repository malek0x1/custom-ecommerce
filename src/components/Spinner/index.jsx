
const Spinner = ({ color }) => {
    return (
        <div

            style={{
                border: `2px solid ${color}`,
                borderLeftColor: "transparent"
            }}
            className='loader border-l-transparent' />
    )
}

export default Spinner