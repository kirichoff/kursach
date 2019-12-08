import React, {Component} from 'react';
import News from "./News";
import "../shadowlll.jpg"
import '../night.jpg'
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link}from 'react-router'
import {filtTag} from "../actions/filtTag";
import {Query} from 'react-apollo'
import gql from "graphql-tag";


const getdataPost = gql`
query  {
    posts
    {
        post_id
        header
        image  
        date
    }
    }
`



var buf;
class ImgRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: []
        }
    }

    componentDidUpdate() {
        buf = this.props.base.addNews[this.props.base.addNews.length - 1]
    }

    rand = (arr) => {
        let ittem = [];
        for (let i = arr.length - 2; i >= 0; i--) {
            let bf = new Date(arr[i].date.toString());
            console.log('BFFFFFFFFFF',bf)
            ittem.push(
                <News
                    key={i}
                    src={arr[i].image}
                    text={arr[i].header}
                    id={arr[i].post_id}
                    date={bf}
                />)
        }
        return (<div className={"test-class"}>{ittem}</div>)
    }


    filt = (state, action) => {
        let filted = [];
        let isall = false
        action.map(t => {
                if (t.Query === true && t.name === "All") isall = true
            }
        )
        if (isall === true)
            return [...state]
        let selected = [];
        action.map(r => {
            if (r.Query === true) selected.push(r.name)
        });
        state.map
        (
            t => (
                t.tag.find(p => selected.find(k => p === k)))
                ? filted.push(t) : null
        )
        return filted
    }

    render = () => {
        return (
            <div>
                <Query query = {getdataPost}>
                {({loading,error,data})=> {
                        console.log(data)
                        if (loading) {console.log('loading',data); return null}
                        if(error) {console.log('err'); return <div>ERRPR</div>}


                        let dat = new Date(data.posts[0].date)
                        console.log('dat',dat)
                        console.log(dat)
                        let size = data.posts.length-1
                        return ( <div>
                                {data.posts[0]?
                                    <div>
                                        <News
                                            imgStyle={"i"}
                                            key={data.posts[size].post_id}
                                            src={data.posts[size].image}
                                            text={data.posts[size].header}
                                            id = {data.posts[size].post_id}
                                            date = {data.posts[size].date}
                                        />
                                        {this.rand(data.posts)}
                                    </div>
                                    :<div>nothin</div>
                                }
                        </div>
                        )
                }}
                </Query>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(ImgRender);
