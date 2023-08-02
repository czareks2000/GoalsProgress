import { observer } from 'mobx-react-lite';
import { CgCloseR } from 'react-icons/cg'

interface Props {
    color: "success" | "error";
    message: string;
    onClick: () => void;
}

export default observer(function Info({ color, message, onClick }:Props) {
    return (
        <div className={`container shadow`}>
            <div className={`outline outline-${color}`}>
                {message}
                <div className='close' onClick={onClick}><CgCloseR/></div>
            </div>
        </div>
    )
})

