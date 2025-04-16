"use client";

//import { EditorState } from "lexical";
//import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
//import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
//import { ContentEditable } from "@lexical/react/LexicalContentEditable";
//import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
//import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
//import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
//import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
//import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
//import ToolbarPlugin from "@/components/plugins/ToolbarPlugin";
import { ToolbarContext } from "./context/ToolbarContext";
import { TableContext } from "./plugins/TablePlugin";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import EditorTheme from "./themes/EditorTheme";
import { SaveButton } from "./SaveButton";

import "./index.css";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { DiscardButton } from "./DiscardButton";
import { createEmptyHistoryState, HistoryPlugin, HistoryState } from "@lexical/react/LexicalHistoryPlugin";


// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
/*
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();
    



    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}
    */

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    throw error;
}

interface EditorComponentProps {
    content?: string | null;
    className?: string;
    onSave?: (content: string) => Promise<boolean>;
    onChangeCallback?: (editorState: EditorState) => void;
}

export default function EditorComponent({content = null, className, onSave, onChangeCallback}: EditorComponentProps) {
    const [isChanged, setIsChanged] = useState(false);
    const [currentInitialContent, setCurrentInitialContent] = useState<string | null>(content);
    const [isClient, setIsClient] = useState(false);
    //const historyRef = useRef(createEmptyHistoryState());
    //const oldHistoryCountRef = useRef(historyRef.current.undoStack.length);

    // Update initial content if the prop changes
    useEffect(() => {
        setCurrentInitialContent(content);
    }, [content]);

    const onChange = (editorState: EditorState) => {
        
        if (onChangeCallback){
            onChangeCallback(editorState);
        }

        if (isChanged) return;
        

        setIsChanged(true);

        /*
        if (oldHistoryCountRef.current != historyRef.current.undoStack.length) {
            setIsChanged(true);
        }
            */
    }

    // Handle successful save by updating the initial content
    const handleSaveSuccess = (savedContent: string) => {
        setCurrentInitialContent(savedContent);
        //oldHistoryCountRef.current = historyRef.current.undoStack.length;
        setIsChanged(false);
    };

    const initialConfig = {
        namespace: "MyEditor",
        theme: EditorTheme,
        onError,
        nodes: [...PlaygroundNodes],
        editorState: currentInitialContent
    };
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={className}>
            {isClient && (
                <LexicalComposer initialConfig={initialConfig}>
                <TableContext>
                    <ToolbarContext>
                        <div className="editor-shell">
                            <Editor />
                            <OnChangePlugin onChange={onChange} />
                            <HistoryPlugin />
                        </div>
                        
                        {/*isChanged && (
                            <div className="flex justify-end mt-5 space-x-2">
                                <DiscardButton 
                                    initialContent={currentInitialContent} 
                                    setIsChanged={setIsChanged} 
                                />
                                <SaveButton 
                                    onSave={onSave}
                                    onSaveSuccess={handleSaveSuccess}
                                />
                            </div>
                        )*/}
                    </ToolbarContext>
                    </TableContext>
                </LexicalComposer>
            )}
        </div>
    );
}