import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ThreadInList = ({ thread }) => {
    const [getIsInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        isThreadInFavorites();
    }, []);

    function handleFavorites() {
        let favoriteThreads = [];

        if (!getIsInFavorites) {
            if (localStorage.getItem("favorite-threads")) {
                favoriteThreads = JSON.parse(
                    localStorage.getItem("favorite-threads")
                );
            }
            favoriteThreads.unshift(thread._id);
            localStorage.setItem(
                "favorite-threads",
                JSON.stringify(favoriteThreads)
            );
            setIsInFavorites(true);
        } else {
            favoriteThreads = JSON.parse(
                localStorage.getItem("favorite-threads")
            );
            favoriteThreads = favoriteThreads.filter((x) => x !== thread._id);
            localStorage.setItem(
                "favorite-threads",
                JSON.stringify(favoriteThreads)
            );
            setIsInFavorites(false);
        }
    }

    function isThreadInFavorites() {
        if (localStorage.getItem("favorite-threads")) {
            const favoriteThreads = JSON.parse(
                localStorage.getItem("favorite-threads")
            );

            const found = favoriteThreads.find((x) => x === thread._id);

            if (found) setIsInFavorites(true);
        } else setIsInFavorites(false);
    }

    return (
        <div className="box2 thread-in-list">
            <div className="thread-in-list-title-wrapper">
                <div
                    onClick={handleFavorites}
                    className="favorites-icon"
                    title="Add to favorites"
                >
                    {getIsInFavorites ? <AiFillHeart /> : <AiOutlineHeart />}
                </div>
                <p className="thread-in-list-title">{thread.title}</p>
            </div>
            <div className="place-holder" />
            <p className="text-center">
                <span className="text-on-break">Posts:</span>{" "}
                {thread.postCount - 1}
            </p>
            <p className="text-center">
                {thread.lastPostTimeStamp === 0 ? (
                    "No posts"
                ) : (
                    <>
                        <span className="text-on-break">Posted on:</span>{" "}
                        {new Date(thread.lastPostTimeStamp).toLocaleString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </>
                )}
            </p>
        </div>
    );
};

export default ThreadInList;
