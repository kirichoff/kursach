 import React from 'react';
import FeatureTable from "../components/FeatureTable";
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";
function ItemPage(props) {

    console.log(props)

    let description;
    const isAdmin = true;

    const [images,setImages] = useState([]);
    const [featureItems,setFeatureItems] = useState([]);

    return (
        <div>
            { !isAdmin?
                <div>
            {props.header}
            <p>{props.description}</p>
            <img src={props.image} alt='image'/>
            <MyCarousel items={[]} />
            <FeatureTable/>
                </div>
                :
                <form onSubmit={e => {
                    e.preventDefault();
                }}
                >
                    {props.header}
                    <input type="textarea" ref={node=>description=node} />
                    <img src={props.image} alt='image'/>
                    <MyCarousel items={[{url:'',content: ''}]} />
                    <FeatureTable/>
                    <input type="submit" value={'сохранить'} />
                </form>
            }
        </div>
    );
}

export default ItemPage;
