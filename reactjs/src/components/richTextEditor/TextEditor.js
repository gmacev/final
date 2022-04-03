import React from "react";

import RichEditor from "./RichEditor";

const TextEditor = ({ getOutput, setOutput, title }) => {
    return (
        <>
            <RichEditor
                getValue={getOutput}
                setValue={setOutput}
                title={title}
            />
        </>
    );
};

export default TextEditor;
