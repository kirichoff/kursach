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
    let [Nav,setNav] = useState({});

    const get = ()=>{
        props.GetAllShopItemsFilter(Nav).then(data=>
            {
                //  props.GetAllShopItemsFilter(Nav);
                if(data.length)
                    setData((data.length)? data : [])
                else
                    props.GetAllShopItemsFilter(Nav).then(data=>
                    {
                        setData((data.length)? data : [])
                    })
            }
        )
    };

    useEffect( ()=>{
        get()
    },[]);
    let isAdmin = true;
    return (
        <Layout>

            <div className={ 'catalog-container' }>
                <CatalogNavbar onClick={()=>get()} onChange={(nav)=>setNav(nav) } />
                <div style={ {marginTop: 25} }>
                    <Masonry
                        breakpointCols={ breakpointColumnsObj }
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        { rendData.map((k, index) =>
                            <CatalogItem link={
                                <Link className={'Link-style'} to={ `/Item/${ k.ShopItemId }` }>
                                    подробнее
                                </Link>
                            }
                                         cart={<span
                                             style={{
                                                 marginLeft: '20%'}}
                                             className={'Link-style'}
                                            onClick={()=>{}}
                                             >
                                             в корзину
                                         </span>}
                                         key={ index } { ...k }/>
                        )
                        }
                    </Masonry>
                    { isAdmin ?
                        <div style={{width: '210px'}} >
                            <Link
                                className={'Link-style'}
                                  to={ '/Item/editor' }>
                                <CatalogItem
                                    header={ 'добавить товар' }
                                    previewImage={ '' }
                                    description={ '' }
                                />
                            </Link>
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
