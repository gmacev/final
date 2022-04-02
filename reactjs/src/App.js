import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Toolbar from "./components/toolbar/Toolbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UsersListPage from "./pages/UsersListPage";

import io from "socket.io-client";
import { useEffect } from "react";
import http from "./plugins/http";
import { setUser, setUserName } from "./redux/User";
import { useDispatch } from "react-redux";
const socket = io.connect(process.env.REACT_APP_SOCKETS_SERVER);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("email")) {
            http.post(
                {
                    emailLS: localStorage.getItem("email"),
                },
                "auto-login"
            )
                .then((res) => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        dispatch(setUser(res.user));
                        dispatch(setUserName(res.user.username));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className="wrapper d-flex align-items-center flex-column">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Toolbar />
                <Routes>
                    <Route
                        path={"/"}
                        element={<HomePage />}
                    />
                    <Route
                        path={"/login"}
                        element={<LoginPage />}
                    />
                    <Route
                        path={"/register"}
                        element={<RegisterPage />}
                    />
                    <Route
                        path={"/users/:page"}
                        element={<UsersListPage />}
                    />
                    <Route
                        path={"/profile/:id"}
                        element={<ProfilePage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
