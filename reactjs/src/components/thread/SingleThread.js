import React, { useEffect, useRef, useState } from "react";
import http from "../../plugins/http";
import PaginationGlobal, { itemsPerPage } from "../pagination/PaginationGlobal";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostInThread from "../post/PostInThread";
import TextEditor from "../richTextEditor/TextEditor";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./style.css";
import { setFavoritesCounter } from "../../redux/User";

const initialOutput = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

const SingleThread = () => {
    const user = useSelector((state) => state.user.value);
    const [getOpacity, setOpacity] = useState(0);
    const [getPosts, setPosts] = useState([]);
    let [getThread, setThread] = useState([]);
    const [getInRequest, setInRequest] = useState(false);
    const [getResponse, setResponse] = useState("");
    const [getIsInFavorites, setIsInFavorites] = useState(false);
    let [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    let [getOutPut, setOutPut] = useState(initialOutput);

    const mountedRef = useRef(true);

    const { id } = useParams();

    const dispatch = useDispatch();

    const goToPage = useNavigate();

    useEffect(() => {
        http.get(`thread/${id}`)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    getThread = res.thread;
                    setThread(res.thread);
                    console.log(res.thread);
                    isThreadInFavorites();
                }
            })
            .catch((err) => {
                console.log(err);
            });

        loadPosts(false);
        loadPosts(true);

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handlePageChange = (newActivePage) => {
        activePage = newActivePage;
        setActivePage(newActivePage);
        goToPage(`/thread/${id}/1`);
        loadPosts();
    };

    function loadPosts(totalCount) {
        if (!totalCount) {
            http.get(`posts/0/${itemsPerPage}/${activePage}/0/${id}`)
                .then((res) => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        setOpacity(1);
                        setPosts(res.posts.reverse());
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            http.get(`posts/1/${itemsPerPage}/${activePage}/0/${id}`)
                .then((res) => {
                    setTotalCount(res.total);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleFavorites() {
        let favoriteThreads = [];

        if (!getIsInFavorites) {
            if (localStorage.getItem("favorite-threads")) {
                favoriteThreads = JSON.parse(
                    localStorage.getItem("favorite-threads")
                );
            }

            favoriteThreads.unshift(getThread);

            dispatch(setFavoritesCounter(favoriteThreads.length));

            localStorage.setItem(
                "favorite-threads",
                JSON.stringify(favoriteThreads)
            );
            setIsInFavorites(true);
        } else {
            favoriteThreads = JSON.parse(
                localStorage.getItem("favorite-threads")
            );

            favoriteThreads = favoriteThreads.filter(
                (x) => x._id !== getThread._id
            );

            dispatch(setFavoritesCounter(favoriteThreads.length));

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

            const found = favoriteThreads.find((x) => x._id === getThread._id);

            console.log(found, getThread._id);

            if (found) setIsInFavorites(true);
        } else setIsInFavorites(false);
    }

    async function createPost() {
        setInRequest(true);
        setResponse("");

        console.log(getOutPut);
        console.log([
            {
                type: "paragraph",
                children: [{ text: "" }],
            },
        ]);

        if (
            getOutPut <= 0 ||
            getOutPut ===
                [
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                ]
        ) {
            setInRequest(false);
            return setResponse("Post can't be empty");
        }

        http.post(
            {
                owner: user.email,
                post: getOutPut,
                threadId: id,
            },
            "create-post"
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    setResponse(res.message);
                } else {
                    setResponse(res.message);
                    setPosts([...getPosts, res.post]);
                    setOutPut([...initialOutput]);
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div
            className="main"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                {getPosts && getPosts.length > 0 && (
                    <>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2 className="thread-title">
                                    {getThread.title}
                                </h2>
                                <p className="small text-sec">
                                    {new Date(
                                        getThread.createdTimeStamp
                                    ).toLocaleString([], {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div
                                onClick={handleFavorites}
                                className="favorites-icon"
                                title="Add to favorites"
                            >
                                {getIsInFavorites ? (
                                    <AiFillHeart />
                                ) : (
                                    <AiOutlineHeart />
                                )}
                            </div>
                        </div>
                        {getPosts.map((post, index) => (
                            <PostInThread
                                post={post}
                                key={index}
                            />
                        ))}
                        {user.email ? (
                            <div className="mt-4 d-flex flex-column align-items-center">
                                <TextEditor
                                    getOutput={getOutPut}
                                    setOutput={setOutPut}
                                />
                                <Button
                                    onClick={createPost}
                                    className={`mt-3 ${
                                        getInRequest && "disabled"
                                    }`}
                                >
                                    Create
                                </Button>
                                {getResponse && getResponse.length > 0 && (
                                    <div
                                        className="alert alert-light mt-3"
                                        role="alert"
                                    >
                                        {getResponse}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-sec m-0 mt-4">
                                Please{" "}
                                <Link
                                    to={"/login"}
                                    className="login-link text-sec"
                                >
                                    login
                                </Link>{" "}
                                to reply
                            </p>
                        )}
                        <PaginationGlobal
                            activePage={activePage}
                            handlePageChange={handlePageChange}
                            totalCount={totalCount}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default SingleThread;
