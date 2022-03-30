import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_SOCKETS_SERVER);

console.log(process.env.REACT_APP_SOCKETS_SERVER);

function App() {
    return (
        <div className="wrapper d-flex justify-content-center align-items-center flex-column">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route
                        path={"/login"}
                        element={<LoginPage />}
                    />
                    <Route
                        path={"/register"}
                        element={<RegisterPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
