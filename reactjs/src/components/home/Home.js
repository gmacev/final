import React, { useEffect, useState } from "react";

const Home = () => {
    const [getOpacity, setOpacity] = useState(0);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
        }, 100);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    return (
        <div
            className="main"
            style={{ opacity: `${getOpacity}` }}
        />
    );
};

export default Home;
