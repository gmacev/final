import React from "react";
import "./style.css";

const Button = ({ children, onClick, className, id }) => {
    return (
        <button
            className={`button ${className}`}
            id={id}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
