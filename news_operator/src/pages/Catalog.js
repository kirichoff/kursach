import React, {useState} from 'react';
import Layout from "../components/Layout";
import CatalogItem from "../components/CatalogItem";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import CatalogNavbar from "../components/CatalogNavbar";
import '../style/Catalog.css'
import Masonry from "react-masonry-css";
import {Link} from 'react-router'
import {useEffect } from 'react'
import Button from "rambler-ui/Button";

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    770: 1

};

function Catalog(props) {
    let [rendData,setData]= useState([]);
    useEffect( ()=>{
        props.GetAllShopItems().then(data=>
            setData((data.length)? data : [])
        );
    },[]);
    let isAdmin = true;
    return (
        <Layout>

            <div className={ 'catalog-container' }>
                <CatalogNavbar/>
                <div style={ {marginTop: 25} }>
                    <Masonry
                        breakpointCols={ breakpointColumnsObj }
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        { rendData.map((k, index) =>
                            <CatalogItem link={
                                <Button  size={'small'} container={<Link to={ `/Item/${ k.ShopItemId }` }/>} > подробнее </Button>
                            }
                                         cart={<Button
                                             size={'small'}
                                            onClick={()=>{}}
                                             type={'outline'}>
                                             в корзину
                                         </Button>}
                                         key={ index } { ...k }/>
                        )
                        }
                    </Masonry>
                    { isAdmin ?
                        <div>
                            <Link to={ '/Item/editor' }> <CatalogItem header={ 'Add' } previewImage={ '' }
                                                                      description={ 'description' }/></Link>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
