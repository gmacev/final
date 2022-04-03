import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../plugins/http";
import { setUserEmail, setUserId } from "../../redux/User";
import Button from "../button/Button";

const RegisterUserComp = () => {
    const emailRef = useRef();
    const usernameRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const navigate = useNavigate();

    const [getResponse, setResponse] = useState("");
    const [getInRequest, setInRequest] = useState(false);
    let [getOpacity, setOpacity] = useState(0);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
        }, 100);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    async function registerUser() {
        setInRequest(true);
        setResponse("");

        emailRef.current.value = emailRef.current.value.trim();
        usernameRef.current.value = usernameRef.current.value.trim();

        if (emailRef.current.value.length <= 0) {
            setInRequest(false);
            return setResponse("Email can't be empty");
        }

        if (password1Ref.current.value.length <= 0) {
            setInRequest(false);
            return setResponse("Password can't be empty");
        }

        if (password1Ref.current.value !== password2Ref.current.value) {
            setInRequest(false);
            return setResponse("Passwords do not match");
        }

        if (
            password1Ref.current.value.length < 5 ||
            password1Ref.current.value.length > 50
        ) {
            setInRequest(false);
            return setResponse(
                "Password length should be between 5 and 50 characters"
            );
        }

        http.post(
            {
                email: emailRef.current.value,
                username: usernameRef.current.value,
                password1: password1Ref.current.value,
                password2: password2Ref.current.value,
            },
            "register-user"
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    setResponse(res.message);
                } else {
                    setResponse(res.message);
                    navigate("/login", {
                        state: { email: emailRef.current.value },
                    });
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div
            className="main register"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box d-flex flex-column align-items-center">
                <div className="d-flex flex-column justify-content-center">
                    <h2 className="text-center">Register user</h2>
                    <label
                        htmlFor="display-name"
                        className="mt-3"
                    >
                        Display name:
                    </label>
                    <input
                        id="display-name"
                        ref={usernameRef}
                        type="text"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Display name"
                    />
                    <label
                        htmlFor="email"
                        className="mt-3"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        ref={emailRef}
                        type="email"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Email"
                    />
                    <label
                        htmlFor="password"
                        className="mt-3"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        ref={password1Ref}
                        type="password"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Password"
                    />
                    <label
                        htmlFor="repeat-password"
                        className="mt-3"
                    >
                        Repeat password:
                    </label>
                    <input
                        id="repeat-password"
                        ref={password2Ref}
                        type="password"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Repeat password"
                    />

                    <Button
                        onClick={() => registerUser()}
                        className={`mt-3 ${getInRequest && "disabled"}`}
                    >
                        Register
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
                            to={"/login"}
                            className="small"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUserComp;
