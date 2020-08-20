import React from 'react';
const Editor = (props) => {

  return (
    <textarea name="editor" id="editor" cols="30" rows="10" value={props.value} onChange={props.onChange}/>
  );
};

export default Editor;
