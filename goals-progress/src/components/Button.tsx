import { ReactNode } from "react";

interface Props {
  text: ReactNode;
  color: string;
  onClick?: () => void;
}

const Button = ({ text, color, onClick }: Props) => {
  return (
    <button 
        className="btn"
        style={{backgroundColor: color}}
        onClick={onClick} 
    >
    {text}
    </button>
  )
}

export default Button
