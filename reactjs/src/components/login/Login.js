import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../plugins/http";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserId } from "../../redux/User";
import Button from "../button/Button";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    //const { email } = useSelector((state) => state.userData.value);
    const dispatch = useDispatch();

    const [getResponse, setResponse] = useState("");
    const [getInRequest, setInRequest] = useState(false);

    const navigate = useNavigate();

    async function loginUser() {
        setInRequest(true);
        setResponse("");

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
                    setInRequest(false);
                    dispatch(setUserId(res._id));
                    dispatch(setUserEmail(res.email));
                    navigate("/");
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div className="w-100 d-flex flex-column align-items-center">
            <div
                className="d-flex flex-column justify-content-center"
                style={{ width: "250px" }}
            >
                <h4 className="text-center">Login</h4>
                <input
                    ref={emailRef}
                    type="text"
                    className={`mt-3 ${getInRequest && "disabled"}`}
                    placeholder="Email"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    className={`mt-3 ${getInRequest && "disabled"}`}
                    placeholder="Password"
                />

                <Button
                    onClick={() => loginUser()}
                    className={`mt-3 ${getInRequest && "disabled"}`}
                >
                    Login
                </Button>
            </div>
            <div>
                {getResponse.length > 0 && (
                    <div
                        className="alert alert-light mt-3"
                        role="alert"
                    >
                        {getResponse}
                    </div>
                )}

                <p
                    className="mt-3 small text-black-50 text-center"
                    onClick={() => navigate("/register")}
                    style={{ cursor: "pointer" }}
                >
                    Register
                </p>
            </div>
        </div>
    );
};

export default Login;
