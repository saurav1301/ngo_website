import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="navbar">
      <div className="ngo-name-container">
        <div className="ngo-name">HelpCare NGO</div>
      </div>
      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
        <NavLink to="/events" activeClassName="active">Events</NavLink>
        <NavLink to="/donate" activeClassName="active">Donate</NavLink>
        <NavLink to="/volunteer" activeClassName="active">Volunteer</NavLink>
        <NavLink to="/impact" activeClassName="active">Impact</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        <NavLink to="/admin" activeClassName="active">Admin</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
