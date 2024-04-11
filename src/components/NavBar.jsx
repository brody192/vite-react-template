// src/components/NavBar.jsx
import {Link, NavLink} from 'react-router-dom';
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const {user, logout} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLogout = () => {
        logout();
        // Redirect or additional logic after logout
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLinkClick = () => {
        setIsDropdownOpen(false); // Close the dropdown when a link is clicked
    };

    return (<nav className="bg-boulangerie-main p-4 shadow-md">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                {/* Logo on the left */}
                <div className="shrink-0">
                    <NavLink to="/">
                        <img src="/logo.png" alt="Boulangerie Logo" className="h-8" style={{height: "100px"}}/>
                    </NavLink>
                </div>

                {/* Navigation links in the middle */}
                <ul className="flex space-x-4 justify-center flex-1">
                    <li>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products"
                                 className={({isActive}) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about"
                                 className={({isActive}) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Who
                            we are</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"
                                 className={({isActive}) => isActive ? "text-white border-b-2 border-white" : "text-white hover:text-gray-200 transition-colors duration-300"}>Contact
                            Us</NavLink>
                    </li>
                </ul>

                {/* Login and admin links on the right */}
                {user ? (<div className="relative">
                    <button onClick={toggleDropdown}
                            className="bg-boulangerie-main text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-boulangerie-dark transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                        Profile
                        <FontAwesomeIcon
                            icon={isDropdownOpen ? faChevronUp : faChevronDown}
                            className="ml-2 transform transition-transform duration-200"
                        />
                    </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link to="/profile" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Update Profile
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className="text-white hover:text-gray-200 transition-colors duration-300">
                        Login
                    </NavLink>
                )}
            </div>
    </nav>);
}

export default NavBar;
