
const FooterCol = ({ children, title }) => {
    return (
        <div className="flex-1 min-w-52">
            <p className="font-bold mb-4">{title}</p>
            {children}
        </div>
    )
}

export default FooterCol