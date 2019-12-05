import React from 'react';
import FeatureTable from "../components/FeatureTable";
import gql from "graphql-tag";
import {useQuery,useMutation} from "@apollo/react-hooks";
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";

const query = gql`
    query ($itemId: Int!){
        ItemPage(itemId: $itemId){
            Characteristics{
                CharName
                charContent
                charId
                itemId
            }
            ItemComments{
                commentId
                content
                itemId
                user{
                    login
                }
            }
            ItemContents{
                content
                contentId
                itemId
            }
            item{
                ShopItemId
                description
                header
                previewImage
                price
            }
        }
    }
`;

const template = {

};
const mutation =   gql`
    mutation ($description: String, $header: String, $previewImage: Int, $price: Float){
        AddShopItem(description: $description, header: $header, previewImage: $previewImage, price: $price){
          request  
        } 
    }
    `
function ItemPage(props) {

    console.log(props)

    let description;
    const isAdmin = true;

    const [images,setImages] = useState([]);
    const [featureItems,setFeatureItems] = useState([]);
    const [updateItem, { dataMutation }] = useMutation(mutation,{variables:{
            description:description,

        }});
    let {loading, error, data} = useQuery(query, {
        variables: {itemId: props.params.id},
    });

    if( props.params.id === 'add') {
        let data = template
        }
        else{
        if (loading) return null;
        if (error) return `Error! ${error}`;
        }
        console.log(data);

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
                    updateItem({ variables: { type: description.value } }).then((r)=>console.log(r));
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
