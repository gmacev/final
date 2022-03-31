import React from "react";
import "./style.css";
import {
    HiHome,
    HiUsers,
    HiLogin,
    HiLogout,
    HiUserAdd,
    HiSearch,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import userData, { setUserEmail, setUserId } from "../../redux/User";
import { Link, useLocation } from "react-router-dom";

const Toolbar = () => {
    let userState = useSelector((state) => state.user.value);
    const { email } = useSelector((state) => state.user.value);

    const { pathname } = useLocation();

    console.log(email);

    function logOut() {
        console.log(userState);
        userState = {
            ...userState,
            user: state.user.items.filter((i) => i.email !== email),
        };
    }

    return (
        <div className="toolbar">
            <Link
                to={"/"}
                className={`${pathname === "/" && "toolbar-active-item"}`}
            >
                <HiHome />
                <p>Index</p>
            </Link>
            <Link
                to={"/users"}
                className={`${pathname === "/users" && "toolbar-active-item"}`}
            >
                <HiUsers />
                <p>Users</p>
            </Link>
            <div>
                <HiSearch />
                <p>Search</p>
            </div>
            {!email ? (
                <>
                    <Link
                        to={"/register"}
                        className={`${
                            pathname === "/register" && "toolbar-active-item"
                        }`}
                    >
                        <HiUserAdd />
                        <p>Register</p>
                    </Link>
                    <Link
                        to={"/login"}
                        className={`${
                            pathname === "/login" && "toolbar-active-item"
                        }`}
                    >
                        <HiLogin />
                        <p>Login</p>
                    </Link>
                </>
            ) : (
                <div onClick={logOut}>
                    <HiLogout />
                    <p>Logout</p>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
