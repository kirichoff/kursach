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
import IconButton from "rambler-ui/IconButton";
import {AddIcon} from "rambler-ui/icons/forms";
import Spinner from "rambler-ui/Spinner";
import NotifyError from "../components/NotifyError";
import Serch from "../components/Serch";
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    770: 1

};

function Catalog(props) {
    let [rendData, setData] = useState(null);
    let [Nav, setNav] = useState({
        min: 1,
        max: 99999999999,
        category: 3
    });
    const get = () => {
        props.GetAllShopItemsFilter(Nav).then(data => {
                console.log('data',data);
            setData((data.length) ? data : []);
                if(data.error){
                    let ar = [];
                    ar.error= data.error;
                    setData(ar);
                }
            }
        )
    };
    useEffect( ()=>{
        get()
    },[]);

    let isAdmin = (props.state.User && props.state.User.rights === 1) ;
    console.log('Catalog',Nav)
    return (
        <Layout >
            {/*<Serch/>*/}
            <div className={ 'catalog-container' }>
                <CatalogNavbar  onClick={ () => get() } Nav={Nav} onChange={ setNav }/>
                <div style={ {marginTop: 25} }>
                    { rendData && rendData.length !== 0?
                        <Masonry
                            breakpointCols={ breakpointColumnsObj }
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            { rendData !== null ? rendData.map((k, index) =>

                                    <CatalogItem link={
                                        <Link className={ 'Link-style' } to={ `/Item/${ k.ShopItemId }` }>
                                            подробнее
                                        </Link>
                                    }
                                                 cart={
                                                     <span
                                                     style={ {
                                                         marginLeft: '0.8vw'
                                                     } }
                                                     className={ 'Link-style' }
                                                     onClick={ () => {
                                                         props.AddToCart({...k})
                                                     } }>
                                             в корзину
                                         </span> }
                                                 delete={
                                                isAdmin?     <span
                                                         style={ {
                                                             marginLeft: '30%'
                                                         } }
                                                         className={ 'Link-style' }
                                                         onClick={ () => {
                                                             props.DeleteItem({ShopItemId: k.ShopItemId}).then(get())
                                                         } }>
                                                 удалить

                                         </span>
                                                    :
                                                    <span>

                                                    </span>
                                                 }

                                                 key={ index } { ...k }/>
                                )
                                :
                                <div style={ {
                                    position: 'absolute',
                                    top: ' 53vh',
                                    left: '56%'
                                } }><Spinner size={ 30 }/></div>
                            }

                        </Masonry>
                        :
                        <h1 style={{marginLeft: '100px'}} >Ничего не найдено</h1>
                    }
                    { isAdmin ?
                        <div style={{margin: 'auto',width:'47px',display: 'block'}} >
                            <Link
                                className={'Link-style'}
                                  to={ '/Item/editor' }>
                                <IconButton
                                    onClick={ ()=>{} }
                                    type={ 'primary' }>
                                    <AddIcon/>
                                </IconButton>
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
