import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineTopic } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";

import "./style.css";
import Button from "../button/Button";
import http from "../../plugins/http";
import { setUserName, setUserAvatar } from "../../redux/User";
import { useDispatch } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user.value);

    const [getOpacity, setOpacity] = useState(0);
    const [getActiveTab, setActiveTab] = useState(0);
    const [getInRequest, setInRequest] = useState(false);
    const [getResponse, setResponse] = useState("agfasga ag asg asg ");

    const dispatch = useDispatch();
    const imageUrlRef = useRef();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
        }, 100);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    function changeImage() {
        http.post(
            {
                avatar: imageUrlRef,
            },
            "change-avatar"
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    setResponse(res.message);
                } else {
                    setResponse(res.message);
                    dispatch(setUserAvatar(res.avatar));
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
                <div className="profile-info-wrapper justify-content-between flex-wrap">
                    <div className="d-flex flex-wrap justify-content-center gap-4">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            <h2>{user.username}</h2>
                            <h5>{user.email}</h5>
                            <p className="mt-3">
                                <b>Registered on:</b>{" "}
                                {new Date(
                                    user.registeredTimeStamp
                                ).toLocaleString([], {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </p>
                            <p>
                                <b>Post count:</b> {user.postCount}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex flex-column align-items-center">
                            <div>
                                <div className="w-100 d-flex align-items-center justify-content-center">
                                    <div>
                                        <label htmlFor="image-input">
                                            Image url:
                                        </label>
                                        <input
                                            id="image-input"
                                            ref={imageUrlRef}
                                            type="text"
                                            className={`${
                                                getInRequest && "disabled"
                                            } w-100`}
                                            style={{
                                                maxWidth: "300px",
                                                minWidth: "200px",
                                            }}
                                            placeholder="Image URL"
                                        />
                                    </div>
                                    <Button
                                        onClick={changeImage}
                                        className={`align-self-end ${
                                            getInRequest && "disabled"
                                        }`}
                                    >
                                        Change
                                    </Button>
                                </div>
                                {getResponse && getResponse.length > 0 && (
                                    <div
                                        className="alert alert-light mt-3"
                                        role="alert"
                                    >
                                        {getResponse}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-tabs mt-4">
                    <div
                        className={`profile-tab ${
                            getActiveTab === 0 && "profile-tab-active"
                        } d-flex gap-2 justify-content-center align-items-center`}
                        onClick={() => setActiveTab(0)}
                    >
                        <MdOutlineTopic style={{ fontSize: "25px" }} />
                        Threads
                    </div>
                    <div
                        className={`profile-tab ${
                            getActiveTab === 1 && "profile-tab-active"
                        } d-flex gap-2 justify-content-center align-items-center`}
                        onClick={() => setActiveTab(1)}
                    >
                        <RiMessage3Line style={{ fontSize: "25px" }} />
                        Posts
                    </div>
                </div>

                <div className="mt-3">
                    {getActiveTab === 0 ? <div>asfasf</div> : <div>dg4sdf</div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
