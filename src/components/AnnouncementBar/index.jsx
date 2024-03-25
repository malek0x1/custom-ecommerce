
const AnnouncementBar = ({ message }) => {
    return (
        <div className="bg-gray-50 w-full p-2 text-center">
            <p className='text-gray-600 text-xs font-medium'>
                {message}
            </p>
        </div>
    )
}

export default AnnouncementBar