import React from 'react';
import { Link } from "react-router-dom";

import './index.scss';

const NavBar = () => {
    return (
        <ul>
            <li><Link to="/sweptakes">Prediction</Link></li>
            <li><Link to="/sweptakes/Result">Results</Link></li>
            <li><Link to="/sweptakes/Standing">Standing</Link></li>
        </ul>

    );
};

export default NavBar;