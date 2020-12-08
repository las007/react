import React from 'react'
import BraftEditor from 'braft-editor'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import 'braft-editor/dist/index.css'
import './Editor.less'


class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(`<p>Hello World!</p>`),
            outputHTML: `<p></p>`
        }
    }

    componentDidMount() {
        console.log('log edit.', this.props)
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }
    handleChange = editorState => {
        this.props.getStatus(editorState.toHTML())
      this.setState({
          editorState: editorState,
          outputHTML: editorState.toHTML()
      })
    };
    preview = () => {
        console.log('log preview.', this.props)
        // this.props.getStatus(this.buildPreviewHtml())
        this.props.getStatus(this.state.outputHTML)
        // window.open().document.write(this.buildPreviewHtml())
    };
    handleClick = () => {
        console.log('log event.')
    }
    buildPreviewHtml () {
        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `
    };

    render() {
        const { editorState, outputHTML } = this.state
        const extendControl = [
            {
                key: 'content-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }
        ];

        return (
            <div className="editor-container">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleChange}
                    /*extendControls={extendControl}*//>
                {this.props.isEdit ?
                        <span style={{ cursor: 'pointer', display: 'inline-block', color: 'orange', fontSize: '18px', margin: '25px' }} onClick={this.preview}>文章预览</span>
                        : null}
                <hr/>
                <p>显示输出内容!</p>
                <div>{ outputHTML }</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // to do..
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // to do...
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
