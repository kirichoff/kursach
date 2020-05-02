import React, {useEffect, useState} from 'react';
import CommentRedactor from "./CommentRedactor";
import Button from "rambler-ui/Button";

function CommentComponent(props) {

    const [userComment, setUserComment] = useState('');
    let [comments, setComment] = useState([]);
    let user = props.state.User
    useEffect(() => {
        props.GetComments({itemId: props.itemId}).then(
            response => {
                    if (user && user.userId) {
                        let index  = response.findIndex(i => i.itemId === user.userId);
                        let comm;
                        let comments;
                        console.log('index',index)
                        if(index >= 0) {
                            comm = {...response[index]}
                            comments = response.length>1? response.splice(index,1) : [];
                            console.log(comments)
                        }
                        setUserComment(comm || {})
                        setComment(comments)
                    }
                    else {
                        setComment(response);
                        setUserComment({})
                    }
            }
        )
    }, [props.itemId])

    return (
        <div>
            <h3 style={{borderBottom: '1px solid grey'}}>Отзывы</h3>
            {comments && comments.length ? comments.map(item => {
                    return (<div      key={item.commentId}>
                            <h5>От {user.login}</h5>
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
                {user && userComment ?
                    <>
                        <h3>Ваш отзыв</h3>
                        <CommentRedactor
                            userId={user.userId}
                            itemId={props.itemId}
                            commentId={userComment.commentId}
                            {...props}
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

export default CommentComponent;