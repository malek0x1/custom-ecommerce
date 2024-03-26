import { Button as ShadCnButton } from "../ui/button"

const Button = ({ className = "", label, defaultStyle = true, ...rest }) => {
    return (
        <ShadCnButton
            className={`w-full ${defaultStyle && " text-white"} rounded-none py-5 ${className}`}  {...rest}>
            {label}
        </ShadCnButton>
    );
};

export default Button;
