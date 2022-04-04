import React from "react";
import ThreadList from "../components/thread/ThreadList";

const FavoritesPage = () => {
    return (
        <>
            <ThreadList favorites={1} />
        </>
    );
};

export default FavoritesPage;
