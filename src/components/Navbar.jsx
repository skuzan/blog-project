import { Link, NavLink } from "react-router"


const Navbar = () => {
  return (
    <div className="navbar">
    <NavLink to='/'> Home</NavLink>
    <NavLink to='/posts'> Posts</NavLink>
    <NavLink to='/about'> About</NavLink>
    <NavLink to = '/addpost'>Add Post</NavLink>
    <NavLink to = '/messages'>Messages</NavLink>
    <NavLink to='/contact'> Kontakt</NavLink>
    </div>
  )
}

export default Navbar