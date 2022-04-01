import React, { useState, useEffect, useRef } from "react";
import User from "./User";
import http from "../../plugins/http";
import PaginationGlobal, { itemsPerPage } from "../pagination/PaginationGlobal";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UsersList = () => {
    const [getAllUsers, setAllUsers] = useState([]);
    const [getUsers, setUsers] = useState([]);
    let [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [getOpacity, setOpacity] = useState(0);

    const goToPage = useNavigate();
    const mountedRef = useRef(true);

    useEffect(() => {
        loadUsers(false);
        loadUsers(true);

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handlePageChange = (newActivePage) => {
        activePage = newActivePage;
        setActivePage(newActivePage);
        goToPage(`/users/${newActivePage}`);
        loadUsers(false);
    };

    function loadUsers(totalCount) {
        if (!totalCount) {
            http.get(`users/0/${itemsPerPage}/${activePage}`)
                .then((res) => {
                    setOpacity(1);
                    setUsers(res.users);
                    setAllUsers(res.users);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            http.get(`users/1/${itemsPerPage}/${activePage}`)
                .then((res) => {
                    setTotalCount(res.total);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div
            className="main"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box">
                <h2 className="text-center mb-4">Registered users</h2>
                {/*{(getAllUsers && getAllUsers.length > 0) && <Search initialData={getAllUsers} setResults={setUsers} placeholder={"El. paštas arba tel. nr."} field1={"email"} field2={"phoneNumber"} collection={"userDb"}/>}*/}
                <div className="user-cards">
                    {getUsers && getUsers.length > 0 ? (
                        getUsers.map((user, index) => {
                            return (
                                <User
                                    user={user}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <h5 className="text-center">No users found</h5>
                    )}
                </div>
                <PaginationGlobal
                    activePage={activePage}
                    handlePageChange={handlePageChange}
                    totalCount={totalCount}
                />
            </div>
        </div>
    );
};

export default UsersList;
