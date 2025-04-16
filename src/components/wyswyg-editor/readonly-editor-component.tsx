'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
//import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
//import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
//import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import EditorTheme from './themes/EditorTheme';

interface ReadOnlyEditorProps {
    content: string;
    className?: string;
}

export default function ReadOnlyEditor({ content, className = '' }: ReadOnlyEditorProps) {
    const initialConfig = {
        namespace: 'ReadOnlyEditor',
        theme: EditorTheme,
        nodes: [
            ...PlaygroundNodes
        ],
        editable: false, // This is crucial - makes it read-only
        editorState: content, // Pass the serialized content
        onError: (error: Error) => {
            console.error('ReadOnlyEditor error:', error);
        },
    };

    return (
        <div className={`read-only-editor ${className}`}>
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="WysEditor__contentEditable read-only" />
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* Include only plugins necessary for rendering content */}
                {/* <ListPlugin /> */}
                {/* <LinkPlugin /> */}
                <ClickableLinkPlugin /> {/* Makes links clickable */}
                {/* <TablePlugin /> */}
                {/* Include other rendering plugins as needed */}
            </LexicalComposer>
        </div>
    );
}