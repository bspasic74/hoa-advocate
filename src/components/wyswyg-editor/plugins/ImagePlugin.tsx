'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createImageNode } from '../nodes/ImageNode';
import { $insertNodes, createCommand, LexicalCommand } from 'lexical';
import { useEffect } from 'react';

export const INSERT_IMAGE_COMMAND: LexicalCommand<{src: string, altText: string}> = createCommand();

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: {src: string, altText: string}) => {
        editor.update(() => {
          const imageNode = $createImageNode({src: payload.src, altText: payload.altText});
          $insertNodes([imageNode]);
        });
        return true;
      },
      1
    );
  }, [editor]);

  return null;
} 