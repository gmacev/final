import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const Profile = () => {
    const user = useSelector((state) => state.user.value);

    const [getOpacity, setOpacity] = useState(0);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
        }, 100);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    return (
        <div
            className="main"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                <div className="profile-info-wrapper">
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
                            {new Date(user.registeredTimeStamp).toLocaleString(
                                [],
                                {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }
                            )}
                        </p>
                        <p>
                            <b>Post count:</b> {user.postCount}
                        </p>
                    </div>
                </div>
                <div className="profile-tabs mt-4">
                    <div className="profile-tab">Threads</div>
                    <div className="profile-tab">Posts</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
