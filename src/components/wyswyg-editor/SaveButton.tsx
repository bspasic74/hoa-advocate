// src/components/wyswyg-editor/SaveButton.tsx
'use client';

import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@/components/ui/button';

interface SaveButtonProps {
  onSave: (content: string) => Promise<boolean>;
  onSaveSuccess?: (savedContent: string) => void;
}

export function SaveButton({ onSave, onSaveSuccess }: SaveButtonProps) {
  const [editor] = useLexicalComposerContext();
  const [isSaving, setIsSaving] = useState(false);

  const saveEditorContent = async () => {
    setIsSaving(true);
    try {
      // Get the current editor state as a serializable JSON object
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState.toJSON());
      
      // Call the async save function passed from parent
      const saveSuccessful = await onSave(jsonString);
      
      // If save was successful, notify parent
      if (saveSuccessful && onSaveSuccess) {
        onSaveSuccess(jsonString);
      }
      
      return saveSuccessful;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      onClick={saveEditorContent}
      disabled={isSaving}
    >
      {isSaving ? 'Saving...' : 'Save Content'}
    </Button>
  );
}