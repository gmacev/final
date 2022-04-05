import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
    HiHome,
    HiUsers,
    HiLogin,
    HiLogout,
    HiUserAdd,
    HiSearch,
    HiUserCircle,
} from "react-icons/hi";
import { MdCreateNewFolder, MdFavorite, MdNotifications } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { resetUserState, setNewNotificationsCounter } from "../../redux/User";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Toolbar = () => {
    const { email, _id, favoritesCounter, newNotificationsCounter } =
        useSelector((state) => state.user.value);

    const [getShowSearchField, setShowSearchField] = useState(false);
    const [getPrevSearchInputField, setPrevSearchInputField] = useState("");
    const [getShowNotifications, setShowNotifications] = useState(false);

    const searchInputRef = useRef();
    const mountedRef = useRef(true);

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            mountedRef.current = false;
        };
    }, []);

    function logOut() {
        setShowSearchField(false);
        dispatch(resetUserState());
        localStorage.removeItem("email");
        navigate("/login");
    }

    function handleKeyDown(e) {
        if (e.key === "Escape") {
            setPrevSearchInputField(searchInputRef.current.value);
            setShowSearchField(false);
        }
    }

    function handleClick(e) {
        if (
            (e.target &&
                e.target.className !== null &&
                e.target.parentNode &&
                e.target.parentNode.className !== null &&
                e.target.parentElement &&
                e.target.parentElement.parentElement &&
                e.target.parentElement.parentElement.className !== null &&
                e.target.parentElement.parentElement.className !==
                    "search-nav") ||
            e.target.localName === "html"
        ) {
            if (
                (e.target.className !== "search-input" &&
                    e.target.className !== "search-nav" &&
                    e.target.parentNode.className !== "search-nav" &&
                    e.target.parentElement.parentElement.className !==
                        "search-nav") ||
                e.target.localName === "html"
            ) {
                if (searchInputRef.current) {
                    setPrevSearchInputField(searchInputRef.current.value);
                }

                setShowSearchField(false);
            }

            if (
                e.target.className !== "notifications-icon" ||
                e.target.localName === "html"
            ) {
                // console.log(e.target.className);
                setShowNotifications(false);
            }
        }
    }

    function handleSearchField(e) {
        if (e.target.className !== "search-input") {
            setShowSearchField(!getShowSearchField);
        }
    }

    function handleNotifications(e) {
        console.log(e.target.className);

        if (getShowNotifications) {
            setShowNotifications(false);
        } else {
            setShowNotifications(true);
            dispatch(setNewNotificationsCounter(0));
        }
    }

    function search() {
        if (searchInputRef.current) {
            setPrevSearchInputField(searchInputRef.current.value);
        }
    }

    const favoritesLink = () => (
        <Link
            to={"/favorite-threads/1"}
            className={`position-relative ${
                pathname.includes("/favorite-threads/") && "toolbar-active-item"
            }`}
        >
            <MdFavorite />
            {favoritesCounter > 0 && (
                <div className="position-absolute d-flex align-items-center justify-content-center popupBubble">
                    {favoritesCounter}
                </div>
            )}
            <p>Favorites</p>
        </Link>
    );

    return (
        <>
            <div className={`toolbar ${!email && "toolbar-padding-fix"}`}>
                <Link
                    to={"/"}
                    className={`${pathname === "/" && "toolbar-active-item"}`}
                >
                    <HiHome />
                    <p>Index</p>
                </Link>
                <Link
                    to={"/users/1"}
                    className={`${
                        pathname.includes("/users/") && "toolbar-active-item"
                    }`}
                >
                    <HiUsers />
                    <p>Users</p>
                </Link>
                <div
                    className="search-nav"
                    onClick={handleSearchField}
                >
                    <HiSearch />
                    <p>Search</p>
                    <div className="search-item">
                        {getShowSearchField && (
                            <div className="search-inputs d-flex flex-row vw-100">
                                <input
                                    autoFocus
                                    type="text"
                                    className="search-input"
                                    ref={searchInputRef}
                                    defaultValue={getPrevSearchInputField}
                                />
                                <Button
                                    onClick={search}
                                    className="d-inline-block"
                                >
                                    Search
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                {!email ? (
                    <>
                        {favoritesLink()}
                        <Link
                            to={"/register"}
                            className={`${
                                pathname === "/register" &&
                                "toolbar-active-item"
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
                    <>
                        <Link
                            to={"/new-thread"}
                            className={`${
                                pathname === "/new-thread" &&
                                "toolbar-active-item"
                            }`}
                        >
                            <MdCreateNewFolder />
                            <p>New thread</p>
                        </Link>
                        <Link
                            to={`/profile/${_id}`}
                            className={`${
                                pathname.includes("/profile/") &&
                                "toolbar-active-item"
                            }`}
                        >
                            <HiUserCircle />
                            <p>Profile</p>
                        </Link>
                        {favoritesLink()}
                        <div onClick={logOut}>
                            <HiLogout />
                            <p>Logout</p>
                        </div>
                        <div
                            className="notifications-icon"
                            onClick={handleNotifications}
                            title="Show notifications"
                        >
                            <MdNotifications />
                            {getShowNotifications && (
                                <div className="notifications-dropdown">
                                    <h6 className="text-light text-center mb-4">
                                        Notifications
                                    </h6>
                                    <div className="notifications-dropdown-item">
                                        <span>
                                            asfasf asfasf asfasf asfasf asfasf
                                            asfasf vasfasf asfasf asfasf
                                        </span>
                                        <div className="new-notification float-end" />
                                    </div>
                                    <div className="notifications-dropdown-item">
                                        asfasf
                                    </div>
                                    <div className="notifications-dropdown-item">
                                        asfasf
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Toolbar;
