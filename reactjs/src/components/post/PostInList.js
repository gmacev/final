import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../thread/style.css";
import "./style.css";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import DisplayTextEditorOutput from "../richTextEditor/DisplayTextEditorOutput";

const PostInList = ({ post }) => {
    const [getShowPost, setShowPost] = useState(false);

    return (
        <>
            <div className="box2 thread-in-list post-in-list">
                <div className="">
                    <Link
                        to={`/thread/${post.threadId}/1`}
                        className="thread-in-list-title-wrapper thread-in-list-title"
                    >
                        {post.threadTitle}
                    </Link>
                    <div className="created-on ms-0">
                        Created:{" "}
                        {new Date(post.createdTimeStamp).toLocaleString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
                <Link
                    to="#"
                    className="text-center"
                >
                    <div
                        className="open"
                        onClick={() => setShowPost(!getShowPost)}
                    >
                        {!getShowPost ? (
                            <span>
                                Show post
                                <RiArrowDownSFill />
                            </span>
                        ) : (
                            <span>
                                Hide post
                                <RiArrowUpSFill />
                            </span>
                        )}
                    </div>
                </Link>
            </div>
            {getShowPost && post.post.length > 0 && (
                <div className="box3 p-3 m-3">
                    <DisplayTextEditorOutput
                        getValue={post.post}
                        randomNum={57}
                    />{" "}
                </div>
            )}
        </>
    );
};

export default PostInList;
