import React, { useCallback, useRef } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { Element, Leaf } from "./RichEditor";
import { withHistory } from "slate-history";

const DisplayTextEditorOutput = ({ getValue, setValue, randomNum }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const editorRef = useRef();

    if (!editorRef.current)
        editorRef.current = withHistory(withReact(createEditor()));

    const editor = editorRef.current;

    return (
        <div key={randomNum}>
            {getValue && (
                <Slate
                    editor={editor}
                    value={getValue}
                >
                    <Editable
                        readOnly
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        contentEditable={false}
                    />
                </Slate>
            )}
        </div>
    );
};

export default DisplayTextEditorOutput;
