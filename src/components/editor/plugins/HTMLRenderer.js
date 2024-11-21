import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

export default function HTMLRenderer() {
  const [editor] = useLexicalComposerContext();
  const [parsedHtml, setParsedHtml] = useState('');

  const parseHtml = () => {
    editor.getEditorState().read(() => {
      const newParsedHtml = $generateHtmlFromNodes(editor, null);
      console.log(newParsedHtml);
      setParsedHtml(newParsedHtml);
    });
  };

  return (
    <div>
      <button type="button" onClick={parseHtml}>
        PARSE
      </button>
      <div
        dangerouslySetInnerHTML={{
          __html: parsedHtml
        }}
      />
    </div>
  );
}
