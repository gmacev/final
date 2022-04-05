import React, { useEffect, useRef, useState } from "react";
import PaginationGlobal, { itemsPerPage } from "../pagination/PaginationGlobal";
import http from "../../plugins/http";
import { useNavigate } from "react-router-dom";
import ThreadInList from "./ThreadInList";
import "./style.css";

const ThreadList = ({ favorites }) => {
    const [getAllThreads, setAllThreads] = useState([]);
    const [getThreads, setThreads] = useState([]);
    let [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [getOpacity, setOpacity] = useState(0);

    const goToPage = useNavigate();
    const mountedRef = useRef(true);

    useEffect(() => {
        let timeOut = null;

        if (favorites === 1) {
            if (localStorage.getItem("favorite-threads")) {
                setThreads(
                    JSON.parse(localStorage.getItem("favorite-threads"))
                );
            }

            timeOut = setTimeout(() => {
                setOpacity(1);
            }, 100);
        } else {
            loadThreads(false);
            loadThreads(true);
        }

        return () => {
            clearTimeout(timeOut);
            mountedRef.current = false;
        };
    }, []);

    const handlePageChange = (newActivePage) => {
        activePage = newActivePage;
        setActivePage(newActivePage);
        goToPage(`/threads/${newActivePage}`);
        loadThreads(false);
    };

    function loadThreads(totalCount) {
        if (!totalCount) {
            http.get(`threads/0/${itemsPerPage}/${activePage}/0`)
                .then((res) => {
                    setOpacity(1);
                    setThreads(res.threads);
                    setAllThreads(res.threads);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            http.get(`threads/1/${itemsPerPage}/${activePage}/0`)
                .then((res) => {
                    setTotalCount(res.total);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div
            className="main box-wrapper"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                <h2 className="text-center mb-4">
                    {getThreads && getThreads.length > 0
                        ? favorites !== 1
                            ? "Threads"
                            : "Favorite threads"
                        : "No threads found"}
                </h2>
                <div className="box2 user-threads">
                    {getThreads && getThreads.length > 0 && (
                        <>
                            <div className="thread-in-list header">
                                <div className="place-holder" />
                                <h5>Thread</h5>
                                <h5 className="text-center">Posts</h5>
                                <h5 className="text-center">Last reply</h5>
                            </div>
                            {getThreads.map((thread, index) => {
                                return (
                                    <ThreadInList
                                        thread={thread}
                                        key={index}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
                {favorites !== 1 && (
                    <PaginationGlobal
                        activePage={activePage}
                        handlePageChange={handlePageChange}
                        totalCount={totalCount}
                    />
                )}
            </div>
        </div>
    );
};

export default ThreadList;
