import React, {useState, useRef} from 'react';

import './editor.scss';

const modifiers = {
  'bold': {
    symetrical: true,
    text: '*',
  },
  'italic': {
    symetrical: true,
    text: '_',
  },
  'h1': {
    symetrical: false,
    text: '# ',
  },
  'h2': {
    symetrical: false,
    text: '## ',
  },
};

/**
 * Editor element
 * @param {*} props Props of the component
 */
export default function Editor({onChange, value}) {
  const [content, setContent] = useState(value || null);
  const textAreaRef = useRef(null);

  const textModifier = (modifierId) => {
    const modifier = modifiers[modifierId];
    const modifierLength = modifier.text.length;
    const startPosition = textAreaRef.current.selectionStart;
    const endPosition = textAreaRef.current.selectionEnd;
    const selectionLength = endPosition - startPosition;
    const beforeCaretText = content.substr(0, startPosition);
    const afterCaretText = content.substr(endPosition, content.length);
    const selectedText = content.substr(startPosition, selectionLength);

    textAreaRef.current.value =
        `${beforeCaretText}` +
        `${modifier.text}${selectedText}` +
        `${modifier.symetrical ? modifier.text : ''}` +
        `${afterCaretText}`;
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(
        startPosition + modifierLength,
        endPosition + modifierLength);
  };

  const textAreaChanged = (event) => {
    const value = event.target.value;
    onChange(value);
    setContent(value);
  };

  return (
    <div className="editor">
      <div
        className="editor__header">
        <button
          onClick={textModifier.bind(null, 'h1')}>
          H1
        </button>
        <button
          onClick={textModifier.bind(null, 'h2')}>
          H2
        </button>
        <button
          onClick={textModifier.bind(null, 'bold')}>
          Bold
        </button>
        <button
          onClick={textModifier.bind(null, 'italic')}>
          Italic
        </button>
      </div>
      <textarea
        ref={textAreaRef}
        placeholder="Write the content here"
        value={content}
        onChange={textAreaChanged}>
      </textarea>
    </div>
  );
}
