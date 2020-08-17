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
      formattedText: '# output goes here!!'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({editorText: e.target.value});
    document.getElementById("preview").innerHTML = marked(this.state.editorText);
  }

  render() {
    return (
      <>
        <textarea name="editor" id="editor" cols="30" rows="10" value={this.state.editorText} onChange={this.handleChange}/>
        {/* <Previewer text={this.state.editorText}/> */}
        <div id="preview"></div>
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
