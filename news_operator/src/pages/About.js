import React, {Component} from 'react';
import {connect} from "react-redux";
import Layout from "../components/Layout";

class About extends Component {
    render() {
        return (
                <Layout>
                About
                </Layout>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(About);
