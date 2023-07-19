import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function HomePage() {
    return (
        <>
            <h1 className="text-center">GoalsProgress</h1>
            <Link className="text-center" to='/goals'>
                <Button text={"Your goals"} color="#39a0ca"/>
            </Link>
        </>
    )
}