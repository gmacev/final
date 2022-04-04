import React, { useEffect, useRef, useState } from "react";
import http from "../../plugins/http";
import { itemsPerPage } from "../pagination/PaginationGlobal";
import { useParams } from "react-router-dom";
import PostInThread from "../post/PostInThread";
import TextEditor from "../richTextEditor/TextEditor";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./style.css";

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

    let [getOutPut, setOutPut] = useState(initialOutput);

    const mountedRef = useRef(true);

    const { id } = useParams();

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

        http.get(`posts/0/${itemsPerPage}/1/0/${id}`)
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

        return () => {
            mountedRef.current = false;
        };
    }, []);

    function handleFavorites() {
        let favoriteThreads = [];

        if (!getIsInFavorites) {
            if (localStorage.getItem("favorite-threads")) {
                favoriteThreads = JSON.parse(
                    localStorage.getItem("favorite-threads")
                );
            }
            favoriteThreads.unshift(getThread);
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
                            <div className="p-3 text-center">
                                <h2 className="thread-title">
                                    {getThread.title}
                                </h2>
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
                        <div className="mt-4 d-flex flex-column align-items-center">
                            <TextEditor
                                getOutput={getOutPut}
                                setOutput={setOutPut}
                            />
                            <Button
                                onClick={createPost}
                                className={`mt-3 ${getInRequest && "disabled"}`}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default SingleThread;
