import React, {useEffect, useState} from 'react';
import CommentRedactor from "./CommentRedactor";
import Button from "rambler-ui/Button";
import RatingBar from "../RatingBar";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../reducers";

function CommentComponent(props) {

    const [userComment, setUserComment] = useState('');
    let [comments, setComment] = useState([]);
    let user = props.state.User
    let getComments = ()=> {
        if( props.itemId) {
            props.GetComments({itemId: props.itemId}).then(
                response => {
                    if (user && user.userId && !response.error) {
                        let index = response.findIndex(i => i.userId === user.userId);
                        let comm ;
                        if (index >= 0) {
                            comm = {...response[index]}
                            if(response.length > 1)
                                response.splice(index, 1)
                            else {
                                response=[];
                            }
                        }
                        setComment([ ...response ])
                        setUserComment(comm || {})
                    } else {
                        setComment(response)
                        setUserComment({})
                    }
                }
            )
        }
    }
    useEffect(() => {
        getComments();
    }, [props.itemId])

    return (
        <div>
            <h3 style={{borderBottom: '1px solid grey',marginTop: '20px'}}>Отзывы</h3>
            {comments? comments.map((item,index) => {
                console.log('item',item)
                    return (<div
                            key={index}>
                            <h5>От {item.login}({item.email})</h5>
                            <RatingBar
                                user={{userId: item.userId}}
                                itemId={props.itemId }
                                GetRatingUser = { props.GetRatingUser }
                                setRating={ props.SetRating }
                            />
                            <CommentRedactor
                                readOnly={true}
                                contentState={item.content}
                            />
                        </div>
                    )
                }) :
                null
            }
            <div style={{marginTop: '100px'}}>
                {user &&  typeof userComment == 'object'?
                    <>
                        <h3>Ваш отзыв</h3>
                        { props.itemId?
                            < RatingBar
                                user={props.state.User}
                                itemId={props.itemId }
                                isRedactor={true}

                            />
                            :
                            null
                        }
                        <CommentRedactor
                            refresh={getComments}
                            userId={user.userId}
                            itemId={props.itemId}
                            commentId={userComment.commentId}
                            contentState={userComment.content || ''}
                            readOnly={false}
                        />
                    </>
                    :
                    null
                }
            </div>
        </div>
    );

}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CommentComponent);
