import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
 import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const reader = new FileReader(); // eslint-disable-line no-undef
            reader.onload = e => resolve({ data: { link: e.target.result } });
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
        });
}

class ImageUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            dataState: null
        }
    }
    onContentStateChange = (e)=>{
       if(this.props.content) this.props.content(e)
        this.setState({data: {...e}})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let trans = document.getElementsByTagName('img')

        for(let i=0; i<trans.length; i++) {
            trans[i].style.borderRadius = '900px';
        }
    }
    onEditorStateChange = (editorState) => {
        // this.props.state(editorState)
        this.setState({dataState:
            editorState
        });
    };

    render() {
     return (
         <div className="rdw-storybook-root">
            <Editor
                // toolbarClassName="rdw-storybook-toolbar"
                        // wrapperClassName="rdw-storybook-wrapper"
                // editorClassName="rdw-storybook-editor"
                onContentStateChange={this.onContentStateChange}
                onEditorStateChange={this.onEditorStateChange}
                readonly = { !!this.props.readonly}
                toolbarHidden = {!!this.props.toolbar}
                contentState = {this.props.contentState? JSON.parse(this.props.contentState) : null}
                imageClass = {'someClass'}
                toolbar={{

                    image: {
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                    },
                }}
            />

            {/*<Editor*/}
            {/*    // toolbarClassName="rdw-storybook-toolbar"*/}
            {/*    // wrapperClassName="rdw-storybook-wrapper"*/}
            {/*    editorClassName="editorRenderClass"*/}
            {/*    toolbarHidden*/}
            {/*    readOnly*/}
            {/*     contentState = {this.state.data}*/}
            {/*>*/}

            {/*</Editor>*/}


            {/* {  ReactHtmlParser( this.state.dataState? draftToHtml(convertToRaw(this.state.dataState.getCurrentContent())) : null) }*/}
        </div>
     );
    }
}
export default ImageUpload;
