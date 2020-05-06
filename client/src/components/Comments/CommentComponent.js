import React, {useEffect, useState} from 'react';
import CommentRedactor from "./CommentRedactor";
import Button from "rambler-ui/Button";
import RatingBar from "../RatingBar";

function CommentComponent(props) {

    const [userComment, setUserComment] = useState('');
    let [comments, setComment] = useState([]);
    let user = props.state.User

    useEffect(() => {
        console.log('evv')
        props.GetComments({itemId: props.itemId}).then(
            response => {
                console.log('response',response)
                if (user && user.userId && !response.error) {
                    let index = response.findIndex(i => i.itemId === user.userId);
                    let comm;
                    let comment;
                    console.log('index', index)
                    if (index >= 0) {
                        comm = {...response[index]}
                        comment = response.length > 1 ? response.splice(index, 1) : [];
                    }
                    setComment(comment)
                    setUserComment(comm || {})
                } else {
                    setComment(response)
                    setUserComment({})
                }
            }
        )
    }, [props.itemId])

    return (
        <div>
            <h3 style={{borderBottom: '1px solid grey',marginTop: '20px'}}>Отзывы</h3>
            {comments && comments.length ? comments.map((item,index) => {
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
                {user && userComment && userComment.content ?
                    <>
                        <h3>Ваш отзыв</h3>
                        { props.itemId?
                            < RatingBar
                                user={props.state.User}
                                itemId={props.itemId }
                                isRedactor={true}
                                setRating={ props.SetRating }
                                GetRatingUser = { props.GetRatingUser }
                            />
                            :
                            null
                        }
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