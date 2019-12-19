import React from 'react';

function PostItem(props) {
    return (
        <div>
            <img src={ props.image } alt={'image'}/>
            <textarea value={ props.text }/>
        </div>
    );
}

export default PostItem;
