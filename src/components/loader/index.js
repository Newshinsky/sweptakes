import React from 'react';

import './index.scss'

const Loader = () => {
    return (
        <>
            <div className="about">
                <a className="bg_links social portfolio" target="_blank">
                    <span className="icon"></span>
                </a>
                <a className="bg_links social dribbble" target="_blank">
                    <span className="icon"></span>
                </a>
                <a className="bg_links social linkedin" target="_blank">
                    <span className="icon"></span>
                </a>
            </div>
            <div className="content">
                <div className="loading">
                    <p>loading</p>
                    <span></span>
                </div>
            </div>
        </>
    );
};

export default Loader;