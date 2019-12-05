import React from 'react';
import FeatureTable from "../components/FeatureTable";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
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

function ItemPage(props) {

    const { loading, error, data } = useQuery(query, {
        variables: {itemId: props.itemId },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    console.log(data);

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
