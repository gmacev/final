import React, { useEffect, useRef, useState } from "react";
import PaginationGlobal, { itemsPerPage } from "../pagination/PaginationGlobal";
import http from "../../plugins/http";
import { useNavigate } from "react-router-dom";
import ThreadInList from "./ThreadInList";
import "./style.css";

const ThreadList = () => {
    const [getAllThreads, setAllThreads] = useState([]);
    const [getThreads, setThreads] = useState([]);
    let [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [getOpacity, setOpacity] = useState(0);

    const goToPage = useNavigate();
    const mountedRef = useRef(true);

    useEffect(() => {
        loadThreads(false);
        loadThreads(true);

        return () => {
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
            http.get(`threads/0/${itemsPerPage}/${activePage}`)
                .then((res) => {
                    setOpacity(1);
                    setThreads(res.threads);
                    setAllThreads(res.threads);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            http.get(`threads/1/${itemsPerPage}/${activePage}`)
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
            className="main"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                <h2 className="text-center mb-4">Threads</h2>
                <div className="box2 user-threads">
                    <div className="thread-in-list header">
                        <div className="place-holder" />
                        <h5>Thread</h5>
                        <h5 className="text-center">Posts</h5>
                        <h5 className="text-center">Last reply</h5>
                    </div>
                    {getThreads && getThreads.length > 0 ? (
                        getThreads.map((thread, index) => {
                            return (
                                <ThreadInList
                                    thread={thread}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <h5 className="text-center">No threads found</h5>
                    )}
                </div>
                <PaginationGlobal
                    activePage={activePage}
                    handlePageChange={handlePageChange}
                    totalCount={totalCount}
                />
            </div>
        </div>
    );
};

export default ThreadList;
