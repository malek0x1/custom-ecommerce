import { Input } from '../ui/input';

const TextField = ({ className = "", placeholder = "Email", type = "email", ...rest }) => {
    return (
        <Input className={`w-full rounded-none border-black py-5 ${className}`} placeholder={placeholder} type={type} {...rest} />
    );
};

export default TextField;
