import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav>
            <h1>My Navbar</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;