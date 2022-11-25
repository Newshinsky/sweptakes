import React from 'react';

import img from "../../img/img.png"

import './index.scss'

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <img src={img} alt="babun" />
        </div>
    );
};

export default Loader;