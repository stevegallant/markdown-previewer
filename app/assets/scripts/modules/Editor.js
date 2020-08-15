import React from 'react';

const Editor = (props) => {
  return (
    <textarea name="editor" id="editor" cols="30" rows="10">
      {props.defaultText}
    </textarea>
  );
};

export default Editor;
