import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import http from "../../plugins/http";
import { useDispatch } from "react-redux";
import { setUser, setUserName } from "../../redux/User";
import Button from "../button/Button";
import { Form } from "react-bootstrap";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    const [getResponse, setResponse] = useState("");
    const [getInRequest, setInRequest] = useState(false);
    let [getOpacity, setOpacity] = useState(0);
    let [getUserId, setUserId] = useState("");
    const [getRememberLogin, setRememberLogin] = useState(true);

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
        }, 100);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    async function login() {
        setInRequest(true);
        setResponse("");

        emailRef.current.value = emailRef.current.value.trim();

        if (emailRef.current.value.length <= 0) {
            setInRequest(false);
            return setResponse("Email can't be empty");
        }

        if (passwordRef.current.value.length <= 0) {
            setInRequest(false);
            return setResponse("Password can't be empty");
        }

        http.post(
            {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            },
            "login"
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    setResponse(res.message);
                } else {
                    setResponse(res.message);
                    getUserId = res.user._id;
                    setUserId(res.user._id);
                    dispatch(setUser(res.user));
                    dispatch(setUserName(res.user.username));

                    if (getRememberLogin) {
                        localStorage.setItem("email", res.user.email);
                    }

                    navigate(`/profile/${getUserId}`);
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div
            className="main login"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box d-flex flex-column align-items-center">
                <div className="d-flex flex-column justify-content-center">
                    <h2 className="text-center">Login</h2>
                    <label
                        htmlFor="email"
                        className="mt-3"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        ref={emailRef}
                        type="text"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Email"
                        name="email"
                        defaultValue={state && state.email}
                    />
                    <label
                        htmlFor="password"
                        className="mt-3"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        ref={passwordRef}
                        type="password"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Password"
                        name="password"
                    />

                    <Form>
                        <Form.Check
                            className="d-flex align-items-center mt-3 gap-2"
                            type="checkbox"
                            label="Keep me logged in"
                            checked={getRememberLogin}
                            onChange={() => setRememberLogin(!getRememberLogin)}
                        />
                    </Form>
                    <Button
                        onClick={login}
                        className={`mt-3 ${getInRequest && "disabled"}`}
                    >
                        Login
                    </Button>
                </div>
                <div>
                    {getResponse && getResponse.length > 0 && (
                        <div
                            className="alert alert-light mt-3"
                            role="alert"
                        >
                            {getResponse}
                        </div>
                    )}

                    <div className="mt-2 text-center">
                        <Link
                            to={"/register"}
                            className="small"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
