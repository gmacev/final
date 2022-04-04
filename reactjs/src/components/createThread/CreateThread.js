import React, { useEffect, useRef, useState } from "react";
import TextEditor from "../richTextEditor/TextEditor";
import Button from "../button/Button";
import http from "../../plugins/http";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateThread = () => {
    const user = useSelector((state) => state.user.value);

    const [getOpacity, setOpacity] = useState(0);
    const [getInRequest, setInRequest] = useState(false);
    const [getResponse, setResponse] = useState("");
    const [getRecheck, setRecheck] = useState(false);

    let [getOutPut, setOutPut] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    const navigate = useNavigate();

    const titleRef = useRef();
    const mountedRef = useRef(true);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);
            console.log(user);
        }, 100);

        return () => {
            clearTimeout(timeOut);
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (user.email.length === 0 && localStorage.getItem("email")) {
            return setRecheck(true);
        } else if (!getRecheck && user.email.length === 0)
            return navigate("/login");
    }, [user]);

    async function createThread() {
        setInRequest(true);
        setResponse("");

        titleRef.current.value = titleRef.current.value.trim();

        if (titleRef.current.value.length <= 0) {
            setInRequest(false);
            return setResponse("Title can't be empty");
        }

        if (titleRef.current.value.length > 64) {
            setInRequest(false);
            return setResponse("Title can't be longer than 64 characters");
        }

        http.post(
            {
                owner: user.email,
                title: titleRef.current.value,
                post: getOutPut,
            },
            "create-thread"
        )
            .then((res) => {
                if (res.error) {
                    setInRequest(false);
                    setResponse(res.message);
                } else {
                    setResponse(res.message);
                    navigate(`/thread/${res._id}`);
                }
            })
            .catch((err) => {
                setInRequest(false);
                setResponse(err);
            });
    }

    return (
        <div
            className="main create-thread"
            style={{ opacity: `${getOpacity}` }}
        >
            <div className="box d-flex flex-column align-items-center">
                <div className="d-flex flex-column justify-content-center w-100">
                    <h2 className="text-center">Create a new thread</h2>
                    <label
                        htmlFor="thread-title"
                        className="mt-3"
                    >
                        Thread title:
                    </label>
                    <input
                        id="thread-title"
                        ref={titleRef}
                        type="text"
                        className={`${getInRequest && "disabled"}`}
                        placeholder="Thread title"
                    />
                    <label className="mt-3">Your post:</label>
                    <TextEditor
                        getOutput={getOutPut}
                        setOutput={setOutPut}
                        title={titleRef.current && titleRef.current.value}
                    />
                </div>

                <Button
                    onClick={createThread}
                    className={`mt-3 ${getInRequest && "disabled"}`}
                >
                    Create
                </Button>

                {getResponse && getResponse.length > 0 && (
                    <div
                        className="alert alert-light mt-3"
                        role="alert"
                    >
                        {getResponse}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateThread;
