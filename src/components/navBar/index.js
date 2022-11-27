import React from 'react';
import { Link } from "react-router-dom";

import './index.scss';

const NavBar = () => {
    return (
        <ul>
            <li><Link to="/">Prediction</Link></li>
            <li><Link to="/Result">Results</Link></li>
            <li><Link to="/Standing">Standing</Link></li>
        </ul>

    );
};

export default NavBar;