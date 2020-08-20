import '../styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

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
        <div id="preview" dangerouslySetInnerHTML={{__html: this.state.editorText}}></div>
      </>
    );
  }
}

const defaultEditorText = `
  # This is a header
  The sample markdown text in this field is all passed to the Editor child component via props.
  ## This is a subheader
  etc
`;

ReactDOM.render(<App />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
