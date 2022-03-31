import { useRef, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import http from "../../plugins/http";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserEmail, setUserName } from "../../redux/User";
import Button from "../button/Button";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    //const { email } = useSelector((state) => state.userData.value);
    const dispatch = useDispatch();

    const [getResponse, setResponse] = useState("");
    const [getInRequest, setInRequest] = useState(false);

    const navigate = useNavigate();
    const { state } = useLocation();

    async function login() {
        setInRequest(true);
        setResponse("");

        emailRef.current.value = emailRef.current.value.trim();

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
                    dispatch(setUserId(res._id));
                    dispatch(setUserEmail(res.email));
                    dispatch(setUserName(res.username));
                    navigate("/");
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div className="main">
            <div className="box d-flex flex-column align-items-center">
                <div className="d-flex flex-column justify-content-center">
                    <h2 className="text-center">Login</h2>
                    <input
                        ref={emailRef}
                        type="text"
                        className={`mt-3 ${getInRequest && "disabled"}`}
                        placeholder="Email"
                        name="email"
                        defaultValue={state && state.email}
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        className={`mt-3 ${getInRequest && "disabled"}`}
                        placeholder="Password"
                        name="password"
                    />

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
                            className="small text-black-50"
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
