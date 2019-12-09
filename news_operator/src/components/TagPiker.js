import React, {Component} from 'react';
import  {connect} from 'react-redux'
import '../style/Style.css'
import Tag from "./Tag";
import {swit} from "../actions/swit";
class TagPiker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:[]
        }
    }
    clik  = (name)=>{
        console.log("TagPIker")
        console.log(name)
        this.state.tags.find(k=>k.name===name).Query =!this.state.tags.find(k=>k.name===name).Query
        this.props.onchangeFunction(name)
    }

    render() {

        this.state.tags = this.props.base.Tags
        this.state.tags.map(l=> l.Query = false)

        return (
            <div className={"tag-bar"}>
                {this.state.tags.map((v,i)=>{return(<Tag onclick={this.clik} name={v} key={i}></Tag>)})}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(TagPiker);
