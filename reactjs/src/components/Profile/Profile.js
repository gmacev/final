import React, { useEffect, useRef, useState } from "react";
import { MdOutlineTopic } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { BiMessageSquareEdit } from "react-icons/bi";

import "./style.css";
import Button from "../button/Button";
import http from "../../plugins/http";
import { setUserAvatar, setShowEmail, setUserName } from "../../redux/User";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

const Profile = () => {
    const user = useSelector((state) => state.user.value);

    const [getOpacity, setOpacity] = useState(0);
    const [getActiveTab, setActiveTab] = useState(0);
    const [getInRequest, setInRequest] = useState(false);
    const [getResponse, setResponse] = useState("");
    const [getResponse2, setResponse2] = useState("");
    const [getUser, setUser] = useState({});
    const [getShowUpdateInput, setShowUpdateInput] = useState(false);

    const dispatch = useDispatch();
    const usernameRef = useRef();
    const imageUrlRef = useRef();
    const mountedRef = useRef(true);
    const { id } = useParams();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);

            http.get(`user/${id}`)
                .then((res) => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        setUser(res.user);
                    }
                })
                .catch((err) => {
                    setInRequest(false);
                });
        }, 100);

        return () => {
            clearTimeout(timeOut);
            mountedRef.current = false;
        };
    }, []);

    function postCall(route, state, resValue, prop, value, responseSet) {
        responseSet("");

        http.post(
            {
                [prop]: value,
            },
            route
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    responseSet(res.message);
                } else {
                    responseSet(res.message);
                    dispatch(state(res[resValue]));

                    if (user && user._id === id) {
                        const tempUser = { ...getUser };
                        tempUser[resValue] = res[resValue];
                        setUser(tempUser);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setInRequest(false);
                responseSet(err);
            });
    }

    return (
        <div
            className="main"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                <div className="profile-info-wrapper justify-content-between flex-wrap">
                    <div className="d-flex flex-wrap align-items-start justify-content-center gap-4">
                        <img
                            src={getUser.avatar}
                            alt="avatar"
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            {!getShowUpdateInput ? (
                                <div className="display-name d-flex gap-1">
                                    <h2>{getUser.username}</h2>
                                    <div
                                        className="edit-display-name-btn"
                                        onClick={() =>
                                            setShowUpdateInput(
                                                !getShowUpdateInput
                                            )
                                        }
                                        title="Change display name"
                                    >
                                        <BiMessageSquareEdit />
                                    </div>
                                </div>
                            ) : (
                                user &&
                                user._id === id && (
                                    <div className="d-flex flex-column align-items-center mb-2">
                                        <div className="w-100 d-flex align-items-center justify-content-center">
                                            <div>
                                                <label htmlFor="username-input">
                                                    New display name:
                                                </label>
                                                <input
                                                    id="username-input"
                                                    ref={usernameRef}
                                                    type="text"
                                                    className={`${
                                                        getInRequest &&
                                                        "disabled"
                                                    } w-100`}
                                                    placeholder="Display name"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    setShowUpdateInput(false);

                                                    postCall(
                                                        "change-username",
                                                        setUserName,
                                                        "username",
                                                        "username",
                                                        usernameRef.current
                                                            .value,
                                                        setResponse2
                                                    );
                                                }}
                                                className={`align-self-end ${
                                                    getInRequest && "disabled"
                                                }`}
                                            >
                                                Change
                                            </Button>
                                        </div>
                                        {getResponse && getResponse.length > 0 && (
                                            <div
                                                className="alert alert-light mt-3 mb-3"
                                                role="alert"
                                            >
                                                {getResponse}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                            {(getUser.showEmail || user._id === id) && (
                                <h5>{getUser.email}</h5>
                            )}
                            <p className="mt-3">
                                <b>Registered on:</b>{" "}
                                {new Date(
                                    getUser.registeredTimeStamp
                                ).toLocaleString([], {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </p>
                            <p>
                                <b>Thread count:</b> {getUser.threadCount}
                            </p>
                            <p>
                                <b>Post count:</b> {getUser.postCount}
                            </p>
                        </div>
                    </div>
                    {user && user._id === id && (
                        <div className="d-flex flex-column align-items-center">
                            <div className="w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <label htmlFor="image-input">
                                        Change avatar:
                                    </label>
                                    <input
                                        id="image-input"
                                        ref={imageUrlRef}
                                        type="text"
                                        className={`${
                                            getInRequest && "disabled"
                                        } w-100`}
                                        placeholder="Image URL"
                                    />
                                </div>
                                <Button
                                    onClick={() =>
                                        postCall(
                                            "change-avatar",
                                            setUserAvatar,
                                            "avatar",
                                            "image",
                                            imageUrlRef.current.value,
                                            setResponse
                                        )
                                    }
                                    className={`align-self-end ${
                                        getInRequest && "disabled"
                                    }`}
                                >
                                    Change
                                </Button>
                            </div>
                            <Form>
                                <Form.Check
                                    className="d-flex align-items-center mt-3 gap-2"
                                    type="switch"
                                    label="Show email publicly"
                                    checked={user.showEmail}
                                    onChange={() =>
                                        postCall(
                                            "change-show-email",
                                            setShowEmail,
                                            "showEmail",
                                            "showEmail",
                                            !user.showEmail,
                                            setResponse
                                        )
                                    }
                                />
                            </Form>
                            {getResponse && getResponse.length > 0 && (
                                <div
                                    className="alert alert-light mt-3"
                                    role="alert"
                                >
                                    {getResponse}
                                </div>
                            )}
                        </div>
                    )}
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
