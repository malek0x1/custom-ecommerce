import { Button as ShadCnButton } from "../ui/button"

const Button = ({ className = "", label, ...rest }) => {
    return (
        <ShadCnButton
            className={`w-full rounded-none py-5 ${className}`}  {...rest}>
            {label}
        </ShadCnButton>
    );
};

export default Button;
