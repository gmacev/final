import React, { useEffect, useState } from "react";
import DisplayTextEditorOutput from "../richTextEditor/DisplayTextEditorOutput";
import http from "../../plugins/http";
import { Link } from "react-router-dom";

const PostInThread = ({ post, index }) => {
    let [getUser, setUser] = useState({});

    useEffect(() => {
        http.get(`user/0/${post.owner}`)
            .then((res) => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    getUser = res.user;
                    setUser(res.user);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="d-flex flex-wrap gap-3 mt-4">
            <div className="box user-info d-flex flex-column align-items-center flex1 justify-content-between">
                <div>
                    <img
                        src={getUser.avatar}
                        alt="user avatar"
                        className="avatar-in-thread mb-3"
                    />
                    <Link to={`/profile/${getUser._id}`}>
                        <h6 className="m-0 mb-3 text-center mt">
                            {getUser.username}
                        </h6>
                    </Link>
                    <p>
                        <b>Registered:</b>{" "}
                        {new Date(getUser.registeredTimeStamp).toLocaleString(
                            [],
                            {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }
                        )}
                    </p>
                    <p>
                        <b>Threads:</b> {getUser.threadCount}
                    </p>
                    <p>
                        <b>Posts:</b> {getUser.postCount}
                    </p>
                </div>
                {getUser.showEmail && (
                    <p className="post-owner-email">{post.owner}</p>
                )}
            </div>
            <div
                className={`box post flex6 ${
                    index === 0 && "first-post-in-thread"
                }`}
            >
                <p className="small text-sec ms-5 float-end">
                    {new Date(post.createdTimeStamp).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <DisplayTextEditorOutput
                    getValue={post.post}
                    randomNum={79}
                />
            </div>
        </div>
    );
};

export default PostInThread;
