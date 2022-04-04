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
import { MdCreateNewFolder, MdFavorite } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../redux/User";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Toolbar = () => {
    const { email, _id } = useSelector((state) => state.user.value);

    const [getShowSearchField, setShowSearchField] = useState(false);
    const [getPrevSearchInputField, setPrevSearchInputField] = useState("");
    const searchInputRef = useRef();

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
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
                e.target.className !== "search-input" &&
                e.target.className !== "search-nav" &&
                e.target.parentNode &&
                e.target.parentNode.className !== null &&
                e.target.parentNode.className !== "search-nav" &&
                e.target.parentElement &&
                e.target.parentElement.parentElement &&
                e.target.parentElement.parentElement.className !== null &&
                e.target.parentElement.parentElement.className !==
                    "search-nav") ||
            e.target.localName === "html"
        ) {
            if (searchInputRef.current) {
                setPrevSearchInputField(searchInputRef.current.value);
            }

            setShowSearchField(false);
        }
    }

    function handleSearchField(e) {
        if (e.target.className !== "search-input")
            setShowSearchField(!getShowSearchField);
    }

    function search() {
        if (searchInputRef.current) {
            setPrevSearchInputField(searchInputRef.current.value);
        }
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
                    <Link
                        to={"/favorite-threads/1"}
                        className={`${
                            pathname.includes("/favorite-threads/") &&
                            "toolbar-active-item"
                        }`}
                    >
                        <MdFavorite />
                        <p>Favorites</p>
                    </Link>
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
                <>
                    <Link
                        to={"/new-thread"}
                        className={`${
                            pathname === "/new-thread" && "toolbar-active-item"
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
                    <Link
                        to={"/favorite-threads/1"}
                        className={`${
                            pathname.includes("/favorite-threads/") &&
                            "toolbar-active-item"
                        }`}
                    >
                        <MdFavorite />
                        <p>Favorites</p>
                    </Link>
                    <div onClick={logOut}>
                        <HiLogout />
                        <p>Logout</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Toolbar;
