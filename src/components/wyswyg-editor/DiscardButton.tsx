'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@/components/ui/button'; // Adjust based on your UI components
import { $getRoot } from 'lexical';

interface DiscardButtonProps {
    initialContent: string | null,
    setIsChanged: (isChanged: boolean) => void,
}

export function DiscardButton({ initialContent, setIsChanged }: DiscardButtonProps) {
    const [editor] = useLexicalComposerContext();

    const discardContent = () => {
        if (initialContent) {
            const initialState = editor.parseEditorState(initialContent);
            editor.setEditorState(initialState);
        } else {
            editor.update(() => {
                const root = $getRoot();
                root.clear();
            });
        }
        
        setIsChanged(false);
    }

    return (
        <Button
            onClick={discardContent}
        //className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
            Discard
        </Button>
    );
}