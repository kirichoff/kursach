import React from 'react';
import FeatureTable from "../components/FeatureTable";
import MyCarousel from "../components/MyCarousel";

function ItemPage(props) {
    return (
        <div>
            {props.header}
            <p>{props.description}</p>
            <img src={props.image} alt='image'/>
            <MyCarousel items={[]} />
            <FeatureTable/>
        </div>
    );
}

export default ItemPage;
