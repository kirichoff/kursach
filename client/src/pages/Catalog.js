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
import {useEffect} from 'react'
import IconButton from "rambler-ui/IconButton";
import {AddIcon} from "rambler-ui/icons/forms";
import Spinner from "rambler-ui/Spinner";
import NotifyError from "../components/NotifyError";
import Serch from "../components/Serch";
import Button from "rambler-ui/Button";
import * as Slider from "rc-slider";

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    770: 1

};
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function Catalog(props) {
    const [rendData, setData] = useState([]);
    const [Nav, setNav] = useState({
        min: 1,
        max: 99999,
        minRating: 0,
        maxRating: 5,
        category: 1004
    });

    const [status, setStatus] = useState(false)
    const [search, setSearch] = useState('');
    const get = (searchQuery = '', lastId) => {
        console.log('get')
        props.GetAllShopItemsFilter({...Nav, searchQuery: searchQuery, lastId: lastId || null})
            .then(data => {
                    if (!data.error) {
                        if (lastId)
                            setData([...rendData, ...(data.length) ? data : []]);
                        else
                            setData((data.length) ? data : []);

                    } else {
                        // get()
                    }
                    setStatus(true)
                }
            )
    };
    useEffect(() => {
        get()
    }, []);
    let isAdmin = (props.state.User && props.state.User.rights === 1);
    console.log('Catalog', Nav)
    return (
        <Layout className={'marginCatalog'}>
            <div>
                <Serch find={(value) => get(value)}/>
            </div>
            <div className={'catalog-container'}>
                <CatalogNavbar
                    slider={Range}
                    isAdmin={isAdmin}
                    onClick={() => get()}
                    Nav={Nav}
                    onChange={(val) => setNav(val)}/>
                <div style={{marginTop: 25}}>
                    <h3>{rendData.length == 0 && status ? 'Товары не найдены' : ''}</h3>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {rendData ? rendData.map((k, index) =>
                                <CatalogItem link={
                                    <Link className={'Link-style'} to={`/Item/${k.ShopItemId}`}>
                                        подробнее
                                    </Link>
                                }
                                             cart={
                                                 <span
                                                     style={{
                                                         marginLeft: '0.8vw'
                                                     }}
                                                     className={'Link-style'}
                                                     onClick={() => {
                                                         props.AddToCart({...k})
                                                     }}>
                                             в корзину
                                         </span>}
                                             delete={
                                                 isAdmin ? <span
                                                         style={{
                                                             marginLeft: '30%'
                                                         }}
                                                         className={'Link-style'}
                                                         onClick={() => {
                                                             props.DeleteItem({ShopItemId: k.ShopItemId}).then(get())
                                                         }}>
                                                 удалить

                                         </span>
                                                     :
                                                     <span>

                                                    </span>
                                             }

                                             key={index} {...k}/>
                            )
                            :
                            <div style={{
                                position: 'absolute',
                                top: ' 53vh',
                                left: '56%'
                            }}><Spinner size={30}/></div>
                        }

                    </Masonry>
                    {isAdmin ?
                        <div style={{margin: 'auto', width: '47px', display: 'block'}}>
                            <Link
                                className={'Link-style'}
                                to={'/Item/editor'}>
                                <IconButton
                                    onClick={() => {
                                    }}
                                    type={'primary'}>
                                    <AddIcon/>
                                </IconButton>
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <Button
                style={{marginLeft: '64%', marginTop: 5, width: '100px'}}
                type={'outline'}
                onClick={
                    () => get('', rendData ? rendData[rendData.length - 1].ShopItemId : null)}
            >
                Еще
            </Button>
        </Layout>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
