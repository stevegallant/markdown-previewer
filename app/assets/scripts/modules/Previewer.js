import React from 'react';
import DOMPurify from 'dompurify';
const marked = require('marked');

marked.setOptions({
  breaks: true
});

const Previewer = (props) => {
  let cleanHTML = DOMPurify.sanitize(marked(props.text));
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: cleanHTML}}></div>
  );
};

export default Previewer;
