import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, useSlate } from "slate-react";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import "./style.css";
import "../button/style.css";

import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatListNumbered,
    MdFormatUnderlined,
    MdOutlineFormatListBulleted,
} from "react-icons/md";
import { BiHeading } from "react-icons/bi";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const RichEditor = ({ value, setValue }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [getBtnValue, setBtnValue] = useState([false, true]);

    const handleChange = (e) => {
        //console.log(e, e.target.parentNode.children[0].value);
        const index = e.target.parentNode.children[0].value;

        const btnValues = [...getBtnValue];
        console.log(btnValues, index);
        btnValues[index] = !btnValues[index];

        // console.log(btnValues);

        setBtnValue(btnValues);
        // e.target.parentNode.children[0].value = btnValues[index];

        //console.log(e.target.parentNode.children[0].value);
    };

    return (
        <div className="box2 p-1 mt-4">
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => {
                    console.log(value);
                    setValue(value);
                }}
            >
                <Toolbar>
                    <ToggleButtonGroup
                        type="checkbox"
                        value={getBtnValue}
                    >
                        <MarkButton
                            format="bold"
                            value={0}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <MdFormatBold />
                        </MarkButton>
                        <MarkButton
                            format="italic"
                            value={1}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <MdFormatItalic />
                        </MarkButton>
                        <MarkButton
                            format="underline"
                            value={2}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <MdFormatUnderlined />
                        </MarkButton>
                        <BlockButton
                            format="heading-one"
                            value={3}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <BiHeading />
                        </BlockButton>
                        <BlockButton
                            format="numbered-list"
                            value={4}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <MdFormatListNumbered />
                        </BlockButton>
                        <BlockButton
                            format="bulleted-list"
                            value={5}
                            handleChange={handleChange}
                            getBtnValue={getBtnValue}
                        >
                            <MdOutlineFormatListBulleted />
                        </BlockButton>
                    </ToggleButtonGroup>
                </Toolbar>

                <div className="pl-1">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </div>
            </Slate>
        </div>
    );
};

export const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({
    format,
    children,
    value,
    handleChange,
    getBtnValue,
}) => {
    const editor = useSlate();
    return (
        <div className="mt-1">
            <button
                type={format}
                value={value}
                selected={isBlockActive(editor, format)}
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleBlock(editor, format);
                }}
                onClick={handleChange}
                style={{ lineHeight: 1 }}
                className={`button ${
                    getBtnValue[parseInt(value)] && "button-toggled"
                }`}
            >
                {children}
            </button>
        </div>
    );
};

const MarkButton = ({ format, children, value, handleChange }) => {
    const editor = useSlate();
    return (
        <div className="mt-1">
            <ToggleButton
                type={format}
                value={value}
                selected={isMarkActive(editor, format)}
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
                onClick={handleChange}
                style={{ lineHeight: 1 }}
            >
                {children}
            </ToggleButton>
        </div>
    );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
    <>
        <div className="">{children}</div>
        <div className="pt-2 m-0 p-0">
            <hr />
        </div>
    </>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
    />
));

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format,
    });
    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(n.type),
        split: true,
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export default RichEditor;
