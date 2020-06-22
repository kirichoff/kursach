import React, {useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../style/CommentRedactor.css';
import '../../style/EditorStyle.css';
import Button from "rambler-ui/Button";
import {element} from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../reducers";

function CommentRedactor(props) {
        let readonly = props.readOnly;
        const [content,setContent] = useState()
        const [loading,setLoading] = useState(false)
        let sendComment = () =>{
            console.log('send')
            setLoading(true);
            props.SetRating({
                itemId: props.itemId,
                ratingValue: props.rating,
                userId: props.userId
            });
            props.AddItemComment({itemId:props.itemId,content,userId: props.userId})
            setTimeout(()=>{setLoading(false)},1500)
        }
        let deleteComment = async () =>{
            let rate = await props.GetRatingUser({userId: props.userId, itemId: props.itemId});
            props.DeleteComment({commentId: props.commentId,ratingId: rate && rate[0].ratingId || null})
                .then(r=>{
                    document.location.reload()
                    props.refresh()
                }
            );
        }

        let contentInitial = props.contentState && props.contentState !== 'undefined'? JSON.parse(props.contentState) : null

        return (
            <div className="rdw-storybook-root">
                <Editor
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="bg"
                    onContentStateChange={(val)=>setContent(val)}
                    readOnly = {readonly}
                    defaultContentState = {contentInitial}
                    toolbarHidden = {readonly}
                    imageClass = {'someClass'}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                            bold: { className: 'bordered-option-classname' },
                            italic: { className: 'bordered-option-classname' },
                            underline: { className: 'bordered-option-classname' },
                            strikethrough: { className: 'bordered-option-classname' },
                            code: { className: 'bordered-option-classname' },
                        },
                        blockType: {
                            className: 'bordered-option-classname',
                        },
                        fontSize: {
                            className: 'bordered-option-classname',
                        },
                        fontFamily: {
                            className: 'bordered-option-classname',
                        },
                    }}
                />
                {
                    readonly?
                        null
                        :
                        <div className={'buttons-container'}>
                            <Button loading={loading} onClick={()=>sendComment()} className={'btn'}>отправить</Button>
                            <Button onClick={()=>deleteComment()} className={'btn'}>удалить</Button>
                        </div>
                }

            </div>);
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CommentRedactor);
