import React, {useState, useRef} from 'react';
import {FaBold, FaItalic, FaLink, FaImage} from 'react-icons/fa';

import './Editor.scss';
import ReactMarkdown from 'react-markdown';

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
  'link': {
    symettrical: false,
    text: '[',
    endText: '](http://)',
  },
  'image': {
    symettrical: false,
    text: '![',
    endText: '](http://)',
  }
};

/**
 * Editor element
 * @param {*} props Props of the component
 */
export default function Editor({onChange, value}) {
  const [content, setContent] = useState(value || '');
  const [isEditing, setIsEditing] = useState(true);
  const textAreaRef = useRef(null);

  const textModifier = (modifierId) => {
    // This breaks the Ctrl+z command, maybe try execCommand
    // to append text
    const modifier = modifiers[modifierId];
    const modifierLength = modifier.text.length;
    const startPosition = textAreaRef.current.selectionStart;
    const endPosition = textAreaRef.current.selectionEnd;
    const selectionLength = endPosition - startPosition;
    const beforeCaretText = content.substr(0, startPosition);
    const afterCaretText = content.substr(endPosition, content.length);
    const selectedText = content.substr(startPosition, selectionLength);
    const startModifier = modifier.text;
    const endModifier = modifier.symetrical ? modifier.text : modifier.endText || '';

    textAreaRef.current.value =
        `${beforeCaretText}` +
        `${startModifier}${selectedText}` +
        `${endModifier}` +
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

  const toggleEditingMode = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div className="editor">
      <div
        className="editor__header">
        <div className="editor__header__action-buttons">
          <button
            onClick={textModifier.bind(null, 'h1')}>
            <span>H1</span>
          </button>
          <button
            onClick={textModifier.bind(null, 'h2')}>
            <span>H2</span>
          </button>
          <button
            onClick={textModifier.bind(null, 'bold')}>
            <FaBold></FaBold>
          </button>
          <button
            onClick={textModifier.bind(null, 'italic')}>
            <FaItalic></FaItalic>
          </button>
          <button
            onClick={textModifier.bind(null, 'link')}>
            <FaLink></FaLink>
          </button>
          <button
            onClick={textModifier.bind(null, 'image')}>
            <FaImage></FaImage>
          </button>
        </div>
        <button className="editor__header__preview-button"
          onClick={toggleEditingMode}>
          Preview
        </button>
      </div>
      {isEditing && <textarea
        ref={textAreaRef}
        placeholder="Write the content here"
        value={content}
        onChange={textAreaChanged}>
      </textarea>}
      {!isEditing && <ReactMarkdown source={content}/>}
    </div>
  );
}
