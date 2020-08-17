import React from 'react';
import marked from 'marked';

const Previewer = (props) => {
  return (
    <div id="preview">
      {marked(props.text)}
    </div>
  );
};

export default Previewer;
