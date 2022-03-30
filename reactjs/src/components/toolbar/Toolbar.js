import React from "react";
import "./style.css";
import { HiHome } from "react-icons/hi";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <HiHome />
                <p>Home</p>
            </div>
            <div>
                <HiHome />
            </div>
            <div>
                <HiHome />
            </div>
        </div>
    );
};

export default Toolbar;
