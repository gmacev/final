import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const User = ({ user }) => {
    return (
        <div className="box2 user-card-in-list">
            <div
                className="user-avatar user-avatar-in-list"
                style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <div className="p-2">
                <h6 className="text-center">{user.username}</h6>
                <p>
                    <b>Joined: </b>
                    {new Date(user.registeredTimeStamp).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </p>
                <p>
                    <b>Thread count:</b> {user.threadCount}
                </p>
                <p>
                    <b>Post count:</b> {user.postCount}
                </p>
                <Link
                    to={`/profile/${user._id}`}
                    className="text-center d-block mt-2"
                >
                    Visit profile
                </Link>
            </div>
        </div>
    );
};

export default User;
