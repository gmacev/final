import React, { useEffect, useRef, useState } from "react";
import TextEditor from "../richTextEditor/TextEditor";

const CreateThread = () => {
    const titleRef = useRef();
    const mountedRef = useRef(true);

    const [getOpacity, setOpacity] = useState(0);
    const [getInRequest, setInRequest] = useState(false);
    let [getOutPut, setOutPut] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpacity(1);

            return () => {
                clearTimeout(timeOut);
                mountedRef.current = false;
            };
        }, []);
    }, []);

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
            </div>
        </div>
    );
};

export default CreateThread;
