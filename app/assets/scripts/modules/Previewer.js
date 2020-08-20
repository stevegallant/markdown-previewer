import React from 'react';
const marked = require('marked');

marked.setOptions({
  breaks: true
});

const Previewer = (props) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.text)}}></div>
  );
};

export default Previewer;
