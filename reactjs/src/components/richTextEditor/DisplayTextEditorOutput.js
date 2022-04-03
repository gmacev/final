import React, { useMemo, useCallback, useState, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { Element, Leaf } from "./RichEditor";
import { withHistory } from "slate-history";

const DisplayTextEditorOutput = ({ getValue, setValue, randomNum }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
