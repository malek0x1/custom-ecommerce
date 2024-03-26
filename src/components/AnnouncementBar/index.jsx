
const AnnouncementBar = ({ message }) => {
    return (
        <div
            style={{
                backgroundColor: "#c47961"
            }}
            className=" w-full p-2 text-center">
            <p className='text-white text-xs font-medium'>
                {message}
            </p>
        </div>
    )
}

export default AnnouncementBar