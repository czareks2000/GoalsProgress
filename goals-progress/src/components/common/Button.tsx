import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
}

const Button = ({ text, ...rest }: Props) => {
  return (
    <button
        className={`btn ${rest.className}`}
        {...rest}
    >
    {text}
    </button>
  )
}

export default Button
