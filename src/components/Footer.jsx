import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-boulangerie-main text-white py-8">
            <div className="container mx-auto flex justify-center items-center">
                {/* Social Network Links */}
                <nav className="flex items-center space-x-4 mx-10">
                    <a href="https://www.facebook.com/theweeboulangerie/" className="text-xl hover:text-gray-400" aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebook} alt="Facebook Icon"/>
                    </a>
                    <a href="https://twitter.com/example" className="text-xl hover:text-gray-400" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} alt="Twitter Icon"/>
                    </a>
                    <a href="https://www.instagram.com/theweeboulangerie/" className="text-xl hover:text-gray-400" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} alt="Instagram Icon"/>
                    </a>
                </nav>
                {/* Navigation Links */}
                <nav className="text-sm mx-10">
                    <ul className="flex space-x-4">
                        <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                        <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                        <li><a href="/sitemap" className="hover:text-gray-400">Site Map</a></li>
                    </ul>
                </nav>
            </div>
            {/* Legal and Copyright Information */}
            <div className="container mx-auto mt-4 text-sm text-center">
                <p>© 2024 The Wee Boulangerie. All rights reserved.</p>
                <p className="mt-2">Terms of Use | Privacy Policy | Cookie Policy</p>
            </div>
        </footer>
    );
}

export default Footer;
