import React, {useEffect,Component} from 'react';
import Layout from "../components/Layout";
import CatalogItem from "../components/CatalogItem";
import {connect,useStore,useSelector } from 'react-redux'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import CatalogNavbar from "../components/CatalogNavbar";
import '../style/Catalog.css'

class Catalog extends Component {

    componentDidMount() {
        this.props.Login({login: 'eee', password: 'eee'});
        this.props.GetAllShopItems();
    }

    render() {
        let isAdmin = true;
        let rendData =  [];
        console.log(this.props);
        return (
            <Layout>
                <CatalogNavbar/>
                <div className={'catalog-container'} >
                    {rendData.map((k,index)=><CatalogItem key={index} {...k}/>) }
                {isAdmin?
                    <div>
                        <CatalogItem header={'Add'} previewImage={''} description={'description'}  />
                    </div>
                    :
                    null
                }
                </div>
            </Layout>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
