import Navbar from "./Navbar"

const Header = ({ appName }) => {
  return (
    <>
        <div className="text-center">
            <h1>{appName}</h1>
        </div>
        <Navbar/>
    </>
  )
}

export default Header
