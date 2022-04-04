import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        return navigate("/threads/1");
    });

    return <></>;
};

export default HomePage;
