/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type {Position} from '../../nodes/InlineImageNode/InlineImageNode';
import type {JSX} from 'react';

import '../../nodes/InlineImageNode/InlineImageNode.css';

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
import * as React from 'react';
import {useEffect, useRef, useState, useCallback} from 'react';

import {
  $createInlineImageNode,
  $isInlineImageNode,
  InlineImageNode,
  InlineImagePayload,
} from '../../nodes/InlineImageNode/InlineImageNode';
import Button from '../../ui/Button';
import {DialogActions} from '../../ui/Dialog';
import FileInput from '../../ui/FileInput';
import Select from '../../ui/Select';
import TextInput from '../../ui/TextInput';

export type InsertInlineImagePayload = Readonly<InlineImagePayload>;

export const INSERT_INLINE_IMAGE_COMMAND: LexicalCommand<InlineImagePayload> =
  createCommand('INSERT_INLINE_IMAGE_COMMAND');

interface InlineImagePluginProps {
  uploadFunction?: (formData: FormData) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export function InsertInlineImageDialog({
  activeEditor,
  onClose,
  uploadFunction,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
  uploadFunction?: (formData: FormData) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}): JSX.Element {
  const hasModifier = useRef(false);

  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [showCaption, setShowCaption] = useState(false);
  const [position, setPosition] = useState<Position>('left');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const isDisabled = src === '' || isUploading;

  const handleShowCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCaption(e.target.checked);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value as Position);
  };

  const loadImage = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreview(e.target.result);
        
        // If no upload function provided, use preview as src
        if (!uploadFunction) {
          setSrc(e.target.result);
        }
      }
    };
    reader.readAsDataURL(file);
    
    // If uploadFunction is provided, use it
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
    }
  };

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

  const handleOnClick = () => {
    const payload = {altText, position, showCaption, src};
    activeEditor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      <div style={{marginBottom: '1em'}}>
        <FileInput
          label="Image Upload"
          onChange={loadImage}
          accept="image/*"
          data-test-id="image-modal-file-upload"
        />
      </div>
      <div style={{marginBottom: '1em'}}>
        <TextInput
          label="Alt Text"
          placeholder="Descriptive alternative text"
          onChange={setAltText}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>

      <Select
        style={{marginBottom: '1em', width: '290px'}}
        label="Position"
        name="position"
        id="position-select"
        onChange={handlePositionChange}>
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="full">Full Width</option>
      </Select>

      <div className="Input__wrapper">
        <input
          id="caption"
          className="InlineImageNode_Checkbox"
          type="checkbox"
          checked={showCaption}
          onChange={handleShowCaptionChange}
        />
        <label htmlFor="caption">Show Caption</label>
      </div>
      
      {isUploading && (
        <div style={{marginBottom: '1em', color: '#666'}}>
          Uploading image...
        </div>
      )}
      
      {error && (
        <div style={{marginBottom: '1em', color: '#c62828'}}>
          {error}
        </div>
      )}
      
      {preview && !src && (
        <div style={{marginBottom: '1em'}}>
          <p style={{fontSize: '0.8em', color: '#666', marginBottom: '0.5em'}}>Preview:</p>
          <img 
            src={preview}
            alt="Preview"
            style={{maxHeight: '100px', maxWidth: '100%'}}
          />
        </div>
      )}

      <DialogActions>
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => handleOnClick()}>
          {isUploading ? 'Uploading...' : 'Confirm'}
        </Button>
      </DialogActions>
    </>
  );
}

export default function InlineImagePlugin({
  uploadFunction,
}: InlineImagePluginProps = {}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  // Create a memoized dialog component with the upload function passed in
  const InsertInlineImageDialogWithUpload = useCallback(
    ({activeEditor, onClose}: {activeEditor: LexicalEditor; onClose: () => void}) => (
      <InsertInlineImageDialog
        activeEditor={activeEditor}
        onClose={onClose}
        uploadFunction={uploadFunction}
      />
    ),
    [uploadFunction]
  );

  useEffect(() => {
    if (!editor.hasNodes([InlineImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    const img = document.createElement('img');
    img.src = TRANSPARENT_IMAGE;

    return mergeRegister(
      editor.registerCommand<InsertInlineImagePayload>(
        INSERT_INLINE_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createInlineImageNode(payload);
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
  }, [editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';


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
    editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, data);
  }
  return true;
}

function $getImageNodeInSelection(): InlineImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isInlineImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent): null | InsertInlineImagePayload {
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
    throw Error('Cannot get the selection when dragging');
  }

  return range;
}
