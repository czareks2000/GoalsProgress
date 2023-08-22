import { AlertDialog, AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog";
import { ReactNode, useRef } from "react";

interface Props {
    label: string;
    description: string;
    confirmButtonText?: ReactNode;
    cancelButtonText?: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

const Dialog = ({label, description, confirmButtonText = "Confirm", 
        cancelButtonText = "Cancel", onCancel, onConfirm} : Props) => {
    const cancelRef = useRef(null);
    
    return (
        <div>
            <AlertDialog leastDestructiveRef={cancelRef}>
            <AlertDialogLabel className="text-center">{label}</AlertDialogLabel>

            <AlertDialogDescription className="text-center">
                <p>{description}</p>
            </AlertDialogDescription>

            <div className="text-center">
                <button className="btn" onClick={onConfirm}>
                    {confirmButtonText}
                </button>
                {" "}
                <button className="btn" ref={cancelRef} onClick={onCancel}>
                    {cancelButtonText}
                </button>
            </div>
            </AlertDialog>
        </div>
    )
}

export default Dialog
