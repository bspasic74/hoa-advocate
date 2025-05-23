'use client';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$wrapNodeInElement, mergeRegister} from '@lexical/utils';
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  getDOMSelectionFromTarget,
  isHTMLElement,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  ImagePayload,
} from '../../nodes/ImageNode';
import Button from '../../ui/Button';
import {DialogActions, DialogButtonsList} from '../../ui/Dialog';
import FileInput from '../../ui/FileInput';
import TextInput from '../../ui/TextInput';
import Image from 'next/image';
export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND');

export function InsertImageUriDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void;
}) {
  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');

  const isDisabled = src === '';

  return (
    <>
      <TextInput
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSrc}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <TextInput
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({altText, src})}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

interface ImagesPluginProps {
  captionsEnabled?: boolean;
  uploadFunction?: (formData: FormData) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export function InsertImageUploadedDialogBody({
  onClick,
  uploadFunction,
}: {
  onClick: (payload: InsertImagePayload) => void;
  uploadFunction?: (formData: FormData) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}) {
  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const isDisabled = src === '' || isUploading;

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Show preview immediately
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
    
    // Set default alt text from filename
    if (!altText) {
      setAltText(file.name.split('.')[0]);
    }
    
    // If upload function is provided, use it, otherwise use the preview as src (base64)
    if (uploadFunction) {
      setIsUploading(true);
      setError(null);
      
      try {
        // Create FormData and append the file
        const formData = new FormData();
        formData.append('image', file);
        
        // Call the provided upload function
        const result = await uploadFunction(formData);
        
        if (result.success && result.imageUrl) {
          setSrc(result.imageUrl);
        } else {
          setError(result.error || 'Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Use base64 (original behavior) if no upload function is provided
      // The preview is already set by the reader.onload callback
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSrc(reader.result);
        }
      };
    }
  };

  return (
    <>
      <FileInput
        label="Image Upload"
        onChange={handleImageUpload}
        accept="image/*"
        data-test-id="image-modal-file-upload"
      />
      
      <TextInput
        label="Alt Text"
        placeholder="Descriptive alternative text"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      
      {isUploading && (
        <div className="text-center py-2">Uploading image...</div>
      )}
      
      {error && (
        <div className="text-red-500 py-2">{error}</div>
      )}
      
      {(preview || src) && (
        <div className="py-2">
          <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
          <img
            src={src || preview!} 
            alt={altText || 'Preview'} 
            className="max-h-48 max-w-full object-contain border rounded" 
          />
          {!src && preview && (
            <p className="text-xs text-gray-500 mt-1">
              Local preview only. Confirm to upload.
            </p>
          )}
        </div>
      )}
      
      <DialogActions>
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => onClick({altText, src})}>
          {isUploading ? 'Uploading...' : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  );
}

/**
 * Insert Image Dialog - CALLED FROM TOOLBAR PLUGIN
 * @param activeEditor - The active editor
 * @param onClose - The function to call when the dialog is closed
 * @param uploadFunction - The function to call when the image is uploaded
 * @returns The Insert Image Dialog
 */
export function InsertImageDialog({
  activeEditor,
  onClose,
  uploadFunction,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
  uploadFunction?: (formData: FormData) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}): JSX.Element {
  const [mode, setMode] = useState<null | 'url' | 'file'>(null);
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [activeEditor]);

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      {!mode && (
        <DialogButtonsList>
          <Button
            data-test-id="image-modal-option-url"
            onClick={() => setMode('url')}>
            URL
          </Button>
          <Button
            data-test-id="image-modal-option-file"
            onClick={() => setMode('file')}>
            File
          </Button>
        </DialogButtonsList>
      )}
      {mode === 'url' && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === 'file' && <InsertImageUploadedDialogBody onClick={onClick} uploadFunction={uploadFunction} />}
    </>
  );
}

export default function ImagesPlugin({
  captionsEnabled,
  uploadFunction,
}: ImagesPluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const TRANSPARENT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  useEffect(() => {

    const img = document.createElement('img');
    img.src = TRANSPARENT_IMAGE;

    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event, img);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event);
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [captionsEnabled, editor]);

  return null;
}

function $onDragStart(event: DragEvent, img: HTMLImageElement): boolean {
  const node = $getImageNodeInSelection();
  
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData('text/plain', '_');
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: 'image',
    }),
  );

  return true;
}

function $onDragover(event: DragEvent): boolean {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
  if (!dragData) {
    return null;
  }
  const {type, data} = JSON.parse(dragData);
  if (type !== 'image') {
    return null;
  }

  return data;
}

declare global {
  interface DragEvent {
    rangeOffset?: number;
    rangeParent?: Node;
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target;
  return !!(
    isHTMLElement(target) &&
    !target.closest('code, span.editor-image') &&
    isHTMLElement(target.parentElement) &&
    target.parentElement.closest('div.ContentEditable__root')
  );
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range;
  const domSelection = getDOMSelectionFromTarget(event.target);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
