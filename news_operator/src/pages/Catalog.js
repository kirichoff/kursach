import React, {useEffect,Component} from 'react';
import Layout from "../components/Layout";
import CatalogItem from "../components/CatalogItem";
import {connect,useStore,useSelector } from 'react-redux'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";


class Catalog extends Component {


    componentDidMount() {
        this.props.Login({login: 'eee', password: 'eee'});
        this.props.GetAllShopItems();
    }

    render() {
        let isAdmin = true;
        let rendData =  this.props.state.data || [];
        console.log(this.props);
        return (
            <Layout>
                <div>
                    {rendData.map((k,index)=><CatalogItem key={index} {...k}/>) }
                </div>
                {isAdmin?
                    <div>
                        <CatalogItem header={'Add'} previewImage={''} description={'description'}  />
                    </div>
                    :
                    null
                }
            </Layout>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
