/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {EditorThemeClasses} from 'lexical';

import './EditorTheme.css';

const theme: EditorThemeClasses = {
  autocomplete: 'WysEditor__autocomplete',
  blockCursor: 'WysEditor__blockCursor',
  characterLimit: 'WysEditor__characterLimit',
  code: 'WysEditor__code',
  codeHighlight: {
    atrule: 'WysEditor__tokenAttr',
    attr: 'WysEditor__tokenAttr',
    boolean: 'WysEditor__tokenProperty',
    builtin: 'WysEditor__tokenSelector',
    cdata: 'WysEditor__tokenComment',
    char: 'WysEditor__tokenSelector',
    class: 'WysEditor__tokenFunction',
    'class-name': 'WysEditor__tokenFunction',
    comment: 'WysEditor__tokenComment',
    constant: 'WysEditor__tokenProperty',
    deleted: 'WysEditor__tokenProperty',
    doctype: 'WysEditor__tokenComment',
    entity: 'WysEditor__tokenOperator',
    function: 'WysEditor__tokenFunction',
    important: 'WysEditor__tokenVariable',
    inserted: 'WysEditor__tokenSelector',
    keyword: 'WysEditor__tokenAttr',
    namespace: 'WysEditor__tokenVariable',
    number: 'WysEditor__tokenProperty',
    operator: 'WysEditor__tokenOperator',
    prolog: 'WysEditor__tokenComment',
    property: 'WysEditor__tokenProperty',
    punctuation: 'WysEditor__tokenPunctuation',
    regex: 'WysEditor__tokenVariable',
    selector: 'WysEditor__tokenSelector',
    string: 'WysEditor__tokenSelector',
    symbol: 'WysEditor__tokenProperty',
    tag: 'WysEditor__tokenProperty',
    url: 'WysEditor__tokenOperator',
    variable: 'WysEditor__tokenVariable',
  },
  embedBlock: {
    base: 'WysEditor__embedBlock',
    focus: 'WysEditor__embedBlockFocus',
  },
  hashtag: 'WysEditor__hashtag',
  heading: {
    h1: 'WysEditor__h1',
    h2: 'WysEditor__h2',
    h3: 'WysEditor__h3',
    h4: 'WysEditor__h4',
    h5: 'WysEditor__h5',
    h6: 'WysEditor__h6',
  },
  hr: 'WysEditor__hr',
  hrSelected: 'WysEditor__hrSelected',
  image: 'editor-image',
  indent: 'WysEditor__indent',
  inlineImage: 'inline-editor-image',
  layoutContainer: 'WysEditor__layoutContainer',
  layoutItem: 'WysEditor__layoutItem',
  link: 'WysEditor__link',
  list: {
    checklist: 'WysEditor__checklist',
    listitem: 'WysEditor__listItem',
    listitemChecked: 'WysEditor__listItemChecked',
    listitemUnchecked: 'WysEditor__listItemUnchecked',
    nested: {
      listitem: 'WysEditor__nestedListItem',
    },
    olDepth: [
      'WysEditor__ol1',
      'WysEditor__ol2',
      'WysEditor__ol3',
      'WysEditor__ol4',
      'WysEditor__ol5',
    ],
    ul: 'WysEditor__ul',
  },
  ltr: 'WysEditor__ltr',
  mark: 'WysEditor__mark',
  markOverlap: 'WysEditor__markOverlap',
  paragraph: 'WysEditor__paragraph',
  quote: 'WysEditor__quote',
  rtl: 'WysEditor__rtl',
  specialText: 'WysEditor__specialText',
  tab: 'WysEditor__tabNode',
  table: 'WysEditor__table',
  tableAddColumns: 'WysEditor__tableAddColumns',
  tableAddRows: 'WysEditor__tableAddRows',
  tableAlignment: {
    center: 'WysEditor__tableAlignmentCenter',
    right: 'WysEditor__tableAlignmentRight',
  },
  tableCell: 'WysEditor__tableCell',
  tableCellActionButton: 'WysEditor__tableCellActionButton',
  tableCellActionButtonContainer:
    'WysEditor__tableCellActionButtonContainer',
  tableCellHeader: 'WysEditor__tableCellHeader',
  tableCellResizer: 'WysEditor__tableCellResizer',
  tableCellSelected: 'WysEditor__tableCellSelected',
  tableFrozenColumn: 'WysEditor__tableFrozenColumn',
  tableFrozenRow: 'WysEditor__tableFrozenRow',
  tableRowStriping: 'WysEditor__tableRowStriping',
  tableScrollableWrapper: 'WysEditor__tableScrollableWrapper',
  tableSelected: 'WysEditor__tableSelected',
  tableSelection: 'WysEditor__tableSelection',
  text: {
    bold: 'WysEditor__textBold',
    capitalize: 'WysEditor__textCapitalize',
    code: 'WysEditor__textCode',
    highlight: 'WysEditor__textHighlight',
    italic: 'WysEditor__textItalic',
    lowercase: 'WysEditor__textLowercase',
    strikethrough: 'WysEditor__textStrikethrough',
    subscript: 'WysEditor__textSubscript',
    superscript: 'WysEditor__textSuperscript',
    underline: 'WysEditor__textUnderline',
    underlineStrikethrough: 'WysEditor__textUnderlineStrikethrough',
    uppercase: 'WysEditor__textUppercase',
  },
};

export default theme;
