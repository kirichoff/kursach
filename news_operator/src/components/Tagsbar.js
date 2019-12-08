import React, {Component} from 'react';
import  {connect} from 'react-redux'
import '../style/Style.css'
import Tags from "../reducers/Tags";
import Tag from "./Tag";
import {swit} from "../actions/swit";
class Tagsbar extends Component {

    constructor(props) {
        super(props);
    }


    clik  = (name)=>{
        console.log(this.props.base.Tags.find( t=> name == t.name))
        this.props.dispatch(swit(name))
    }

    render() {
        return (
            <div className={"tag-bar"}>
                {this.props.base.Tags.map((v,i)=>{return(<Tag onclick={this.clik} name={v} key={i}></Tag>)})}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(Tagsbar);
