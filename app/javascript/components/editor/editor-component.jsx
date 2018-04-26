import React from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import { stateToHTML, convertFromRaw } from 'draft-js-export-html';
import createLinkPlugin from 'draft-js-link-plugin'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved
import editorStyles from './editorStyles.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-link-plugin/lib/plugin.css'

const linkPlugin = createLinkPlugin()
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text ';

class EditorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(text),
    };
    this.changeEditorState = this.changeEditorState.bind(this);
  }

  changeEditorState(editorState) {
    let html = stateToHTML(editorState.getCurrentContent());
    this.setState({
      editorState,
      captionHtml: html
    })
    this.props.onChange(html)
  }

  render() {
    return (
      <div className="editor" onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={ this.changeEditorState }
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    )
  }
}

export default EditorComponent;
