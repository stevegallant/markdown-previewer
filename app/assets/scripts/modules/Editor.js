import React from 'react';
const Editor = (props) => {
  return (
    <textarea name="editor" id="editor" value={props.value} onChange={props.onChange}/>
  );
};

export default Editor;
