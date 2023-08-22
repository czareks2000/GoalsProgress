import { ButtonHTMLAttributes, ReactNode } from "react";
import {FaCircleNotch} from "react-icons/fa"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  loading?: boolean;
}

const Button = ({ text, loading, ...rest }: Props) => {
  return (
    <button
        className={`btn ${rest.className}`}
        {...rest}
    >
    {loading ? 
      <FaCircleNotch className="spinner"/>
    :
      text
    }
    </button>
  )
}

export default Button
