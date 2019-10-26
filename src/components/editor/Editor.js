import React, {useState, useRef} from 'react';
import {FaBold, FaItalic, FaLink, FaImage} from 'react-icons/fa';

import './Editor.scss';
import ReactMarkdown from 'react-markdown';

const modifiers = {
  'bold': {
    startText: '**',
    endText: '**',
  },
  'italic': {
    startText: '_',
    endText: '_',
  },
  'h1': {
    startText: '# ',
  },
  'h2': {
    startText: '## ',
  },
  'link': {
    startText: '[](http://',
    endText: ')',
  },
  'image': {
    startText: '![](http://',
    endText: ')',
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
    const modifier = modifiers[modifierId];
    const modifierText = modifier.startText;
    const startPosition = textAreaRef.current.selectionStart;
    const endPosition = textAreaRef.current.selectionEnd;
    const selectionLength = endPosition - startPosition;
    const selectedText = content.substr(startPosition, selectionLength);
    const endModifier = modifier.endText || '';

    textAreaRef.current.focus();
    document.execCommand('insertText', false, `${modifier.startText}${selectedText}${endModifier}`);

    textAreaRef.current.setSelectionRange(
      startPosition + modifierText.length,
      endPosition + modifierText.length
    );
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
        <div className={"editor__header__action-buttons" + (!isEditing ? ' hidden' : '')}>
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
