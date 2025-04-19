import { GiCancel } from "react-icons/gi";

interface ActionButtonProps {
    defaultIcon: JSX.Element;
    defaultText: string;
    active?: boolean;
    iconOnActive?: JSX.Element;
    textOnActive?: string;
    disabled: boolean;
    onClick: () => void;
}

const ActionButton = ({
    defaultIcon,
    defaultText,
    active, 
    iconOnActive = <GiCancel/>,
    textOnActive = 'Cancel',
    disabled, 
    onClick
}: ActionButtonProps) => {
    const activeStyle = active ? 'active' : '';
    const disabledStyle = disabled ? 'disabled' : '';

    return (
        <div 
            className={`action ${activeStyle} ${disabledStyle}`} 
            onClick={onClick}
        >
            {active 
                ? <>{iconOnActive}{textOnActive}</>
                : <>{defaultIcon}{defaultText}</> 
            }
        </div>
    )
}

export default ActionButton
