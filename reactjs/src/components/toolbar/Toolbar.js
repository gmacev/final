import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
    HiHome,
    HiUsers,
    HiLogin,
    HiLogout,
    HiUserAdd,
    HiSearch,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../redux/User";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Toolbar = () => {
    const { email } = useSelector((state) => state.user.value);
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
        navigate("/login");
    }

    function handleKeyDown(e) {
        if (e.key === "Escape") {
            setShowSearchField(false);
        }
    }

    function handleClick(e) {
        if (
            e.target &&
            e.target.className !== null &&
            e.target.className !== "search-input" &&
            e.target.className !== "search-nav" &&
            e.target.parentNode &&
            e.target.parentNode.className !== null &&
            e.target.parentNode.className !== "search-nav" &&
            e.target.parentElement &&
            e.target.parentElement.parentElement &&
            e.target.parentElement.parentElement.className !== null &&
            e.target.parentElement.parentElement.className !== "search-nav"
        ) {
            setShowSearchField(false);
        }
    }

    function handleSearchField(e) {
        if (e.target.className !== "search-input")
            setShowSearchField(!getShowSearchField);
    }

    function search() {
        setPrevSearchInputField(searchInputRef.current.value);
        console.log(searchInputRef.current.value);
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
