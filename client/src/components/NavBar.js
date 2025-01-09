import {NavLink} from "react-router-dom";

function NavBar() {
    return(
        <nav className="navbar">
            <NavLink
            to="/"
            className="nav-link"
            > Pets </NavLink>
            <NavLink
            to="/services"
            className="nav-link"
            > Services </NavLink>
            <NavLink
            to="/newreview"
            className="nav-link"
            > Create A Review </NavLink>

        </nav>
    )
}
export default NavBar;