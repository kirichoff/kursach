import React from 'react';
import Masonry from 'react-masonry-css'
import '../style/teststyle.css'

const breakpointColumnsObj = {
    default: 2,
};
function NewsRendering(props) {
    return (
<Masonry
    breakpointCols = {breakpointColumnsObj }
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
    {props.images.map((k,i)=><div key ={i}><img src={k} alt=""/></div>)}
</Masonry>
    );
}

export default NewsRendering;
