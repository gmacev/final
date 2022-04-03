import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, Slate, useSlate } from "slate-react";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import "./style.css";
import "../button/style.css";
import imageExtensions from "image-extensions";

import parse from "html-react-parser";

import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatListNumbered,
    MdFormatUnderlined,
    MdOutlineFormatListBulleted,
} from "react-icons/md";
import { BiHeading } from "react-icons/bi";
import DisplayTextEditorOutput from "./DisplayTextEditorOutput";
import Button from "../button/Button";

const RichEditor = ({ getValue, setValue, title }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [getBtnValue, setBtnValue] = useState([false, false]);
    const [getEditorEnabled, setEditorEnabled] = useState(false);
    let [getImage, setImage] = useState(null);

    const handleChange = (e) => {
        const index = Number(e.target.parentNode.children[0].value);

        const btnValues = [...getBtnValue];
        btnValues[index] = !btnValues[index];

        if (index === 3) {
            btnValues[4] = false;
            btnValues[5] = false;
        } else if (index === 4) {
            btnValues[3] = false;
            btnValues[5] = false;
        } else if (index === 5) {
            btnValues[3] = false;
            btnValues[4] = false;
        }
        setBtnValue(btnValues);
    };

    function textInput(val) {
        if (!getEditorEnabled) setEditorEnabled(true);

        setValue(val);

        val.map((v) =>
            v.children.map(async (paragraph) => {
                if (
                    paragraph &&
                    paragraph.text &&
                    (paragraph.text.includes("data:image") ||
                        (paragraph.text.includes("http") &&
                            (paragraph.text.includes(".png") ||
                                paragraph.text.includes(".jpg") ||
                                paragraph.text.includes(".jpeg") ||
                                paragraph.text.includes(".bmp") ||
                                paragraph.text.includes(".gif") ||
                                paragraph.text.includes(".webp"))))
                ) {
                    setImage(parse(`<img src="${paragraph.text}" alt=""/>`));
                }
            })
        );
    }

    return (
        <div className="w-100">
            <div className="box2 p-3">
                <Slate
                    editor={editor}
                    value={getValue}
                    onChange={textInput}
                >
                    <Toolbar>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            <MarkButton
                                format="bold"
                                value={0}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <MdFormatBold />
                            </MarkButton>
                            <MarkButton
                                format="italic"
                                value={1}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <MdFormatItalic />
                            </MarkButton>
                            <MarkButton
                                format="underline"
                                value={2}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <MdFormatUnderlined />
                            </MarkButton>
                            <BlockButton
                                format="heading-one"
                                value={3}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <BiHeading />
                            </BlockButton>
                            <BlockButton
                                format="numbered-list"
                                value={4}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <MdFormatListNumbered />
                            </BlockButton>
                            <BlockButton
                                format="bulleted-list"
                                value={5}
                                handleChange={handleChange}
                                getBtnValue={getBtnValue}
                                getEditorEnabled={getEditorEnabled}
                            >
                                <MdOutlineFormatListBulleted />
                            </BlockButton>
                        </div>
                    </Toolbar>

                    <div className="pl-1">
                        <Editable
                            id="textBox"
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="..."
                            spellCheck
                            tabIndex="-1"
                            autoFocus
                        />
                    </div>
                </Slate>
            </div>
            {getValue && (
                <div className="box2 mt-3 p-3">
                    <h3 className="text-center">Preview</h3>

                    <h5>{title}</h5>
                    <DisplayTextEditorOutput
                        getValue={getValue}
                        setValue={setValue}
                        randomNum={Math.floor(Math.random() * 999999)}
                    />
                </div>
            )}
        </div>
    );
};

export const Element = ({ attributes, children, element }) => {
    //console.log(element);
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
    getEditorEnabled,
}) => {
    const editor = useSlate();

    return (
        <div className="mt-1">
            <button
                type={format}
                value={value}
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleBlock(editor, format);
                }}
                onClick={handleChange}
                style={{ lineHeight: 1 }}
                className={`button editor-button ${
                    getBtnValue[parseInt(value)] && "button-toggled"
                } ${!getEditorEnabled && "disabled"}`}
            >
                {children}
            </button>
        </div>
    );
};

const MarkButton = ({
    format,
    children,
    value,
    handleChange,
    getBtnValue,
    getEditorEnabled,
}) => {
    const editor = useSlate();
    return (
        <div className="mt-1">
            <button
                type={format}
                value={value}
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
                onClick={handleChange}
                style={{ lineHeight: 1 }}
                className={`button editor-button ${
                    getBtnValue[parseInt(value)] && "button-toggled"
                } ${!getEditorEnabled && "disabled"}`}
            >
                {children}
            </button>
        </div>
    );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
    <>
        <div className="mb-4">{children}</div>
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
