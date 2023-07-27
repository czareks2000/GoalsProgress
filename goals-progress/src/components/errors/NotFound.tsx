import axios from "axios";

export default function NotFound() {
    return (
        <>
            <div className="container shadow">
                <span className="text-center" style={{fontSize: '150px'}}>
                    404
                </span>
                <h1 className="text-center">Not found</h1>
            </div>
        </>
    )
}