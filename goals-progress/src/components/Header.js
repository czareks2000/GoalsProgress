import Navbar from "./Navbar"

const Header = ({ appName }) => {
  return (
    <>
        <div className="header text-center">
            <h1>{appName}</h1>
        </div>
        <Navbar/>
    </>
  )
}

export default Header
