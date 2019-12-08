import React, {useEffect,Component} from 'react';
import Layout from "../components/Layout";
import CatalogItem from "../components/CatalogItem";
import {connect,useStore,useSelector } from 'react-redux'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import CatalogNavbar from "../components/CatalogNavbar";
import '../style/Catalog.css'
import Masonry from "react-masonry-css";
import {Link} from 'react-router'
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    770: 1

};
class Catalog extends Component {
    componentDidMount() {
        // this.props.Login({login: 'eee', password: 'eee'});
         this.props.GetAllShopItems();
        console.log('get',this.props)
    }
    render() {
        let isAdmin = true;
        let rendData = (this.props.state.data.length)? this.props.state.data : [];
        return (
            <Layout>

                <div className={'catalog-container'} >
                    <CatalogNavbar/>
                    <div style={{marginTop: 25}}>
                    <Masonry
                        breakpointCols = {breakpointColumnsObj }
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                    {rendData.map((k,index)=>
                         <CatalogItem link={<Link to={`/Item/${k.ShopItemId}`}>Подрбнее</Link>} key={index} {...k}/>
                    )
                    }
                    </Masonry>
                {isAdmin?
                    <div>
                       <Link to={'/Item/editor'} > <CatalogItem header={'Add'} previewImage={''} description={'description'}  /></Link>
                    </div>
                    :
                    null
                }
                    </div>
                </div>
            </Layout>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
