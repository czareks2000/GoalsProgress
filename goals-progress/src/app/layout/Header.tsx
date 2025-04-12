import Navbar from "./Navbar"

interface Props {
  appName: string;
}

const Header = ({ appName }: Props) => {
  return (
    <>
        <div className="container-without-border text-center">
            <h1>{appName}</h1>
        </div>
        <Navbar/>
    </>
  )
}

export default Header
