import '../styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';

// My Components
import Editor from './modules/Editor';
import Previewer from './modules/Previewer';

// Main component class
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: defaultEditorText,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({editorText: e.target.value});
  }

  render() {
    return (
      <>
        <Editor value={this.state.editorText} onChange={this.handleChange}/>
        <Previewer text={this.state.editorText}/>
      </>
    );
  }
}

const defaultEditorText = `
  # This is a header
  The sample [markdown text](https://en.wikipedia.org/wiki/Markdown) in this field is passed to the Editor child component via props. You can clear this editor and start typing to see your markdown results in the Previewer pane.
  Technologies used to create this app include:
  * React JavaScript with modular components
  * CSS
  * Webpack & NPM
  * Plugins: marked, DOMpurify
  ## This is a subheader
  The Previewer component imports DOMPurify via \`import DOMPurify from 'dompurify'\` to sanitize user-entered text from the Editor. The full code block of the Previewer component is:
  \`\`\`javascript
  const Previewer = (props) => {
    let cleanHTML = DOMPurify.sanitize(marked(props.text));
    return (
      <div id="preview" dangerouslySetInnerHTML={{__html: cleanHTML}}></div>
    );
  };
  \`\`\`
  > **This is a bolded blockquote**

  Sample image:
  ![alt text goes here](https://ritholtz.com/wp-content/uploads/2020/03/dontpanic.jpg "Don't Panic!")
`;

ReactDOM.render(<App />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
