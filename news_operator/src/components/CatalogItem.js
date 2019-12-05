import React from 'react';

function CatalogItem(props) {
    return (
        <div>
            <div>{props.header}</div>
            <img src={props.previewImage} alt={props.header}/>
            <div>{props.description}</div>
        </div>
    );
}

export default CatalogItem;
