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
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleChange(e) {
    this.setState({editorText: e.target.value});
  }

  handleBtnClick() {
    this.setState({editorText: ''});
  }
  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <button type="button" class="btn btn-sm btn-warning float-right" onClick={this.handleBtnClick}>Clear</button>
              <h2>Enter Your Markdown</h2>
            </div>
            <Editor value={this.state.editorText} onChange={this.handleChange}/>
          </div>
          <div className="col-lg-6">
            <h2>Preview</h2>
            <Previewer text={this.state.editorText}/>
          </div>
        </div>
      </>
    );
  }
}

const defaultEditorText = `
  # This is a header
  The sample [markdown text](https://en.wikipedia.org/wiki/Markdown) in this field is passed to the Editor child component via props. You can clear this editor and start typing to see your markdown results in the Previewer pane.
  Technologies used to create this app include:
  * React JavaScript with modular components
  * Bootstrap CSS
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
  ![alt text goes here](./assets/img/dontpanic.jpg "Don't Panic!")
`;

ReactDOM.render(<App />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
