import React, {Component} from 'react';
import Bar from "./Bar";
import {connect} from "react-redux";
import Layout from "./Layout";

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
