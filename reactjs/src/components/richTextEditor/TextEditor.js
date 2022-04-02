import React from "react";

import RichEditor from "./RichEditor";

const TextEditor = ({ getOutput, setOutput }) => {
    getOutput = [
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ];

    return (
        <>
            <RichEditor
                value={getOutput}
                setValue={setOutput}
            />
        </>
    );
};

export default TextEditor;
