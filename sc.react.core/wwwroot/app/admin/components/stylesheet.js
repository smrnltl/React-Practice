import React from 'react';
import './mystyle.css';

const Stylesheet = (props) => {
    const className = props.primary ? 'primary':''
    return (
        <h1 className={`${className} font-xl`}>Stylesheet</h1>
    );
}

export default Stylesheet;