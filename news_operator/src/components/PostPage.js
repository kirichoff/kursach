import React, {Component} from 'react';
import Post from "./Post";
import '../style/Style.css'
import {Editor, EditorState, RichUtils} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html';
import Bar from "./Bar";
import  {connect} from 'react-redux'
import {add} from "../actions";
import TagPiker from "./TagPiker";
// import RichEditor from "../containers/RichEditor";
import '../icon-image.png'
import ImageUpload from "./Editor";
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';


const postRequest =    gql`
    mutation addPost($content: String, $date: String, $header: String, $image: String, $tag: [String]){
        addPost(content: $content, date: $date, header: $header, image: $image, tag: $tag){
            request
        }
    }
`

class PostPage extends Component {
    constructor(){
        super()
        this.state =
            {
                value: "Hear",
                header: "",
                tags: [],
                immag: undefined,
                imageRaw: '',
                draftValue: {},
                upload: null,
                connect: null
            }
    }

    onch = (value)=>
    {
        this.setState({value:value.getPlainText(),draftValue: value})
    }

    Tagadd = (name)=>{
        if (this.state.tags.find(l=>l === name))
            {
                console.log(name)
                let buf = this.state.tags
                buf.splice(this.state.tags.indexOf(name),1);
                this.setState({tags: buf})
            }
            else {
            this.setState({tags: [...this.state.tags, name]})
            }
    }

    submite = (e)=>{
        let date = new Date;
        this.props.dispatch(add(this.state.value,(
            (this.props.base.addNews.length-1>0)?this.props.base.addNews[this.props.base.addNews.length-1].id+1:
            0)
            ,this.state.header,"../shadowlll.jpg",this.state.tags,`${date.getDay()}.${date.getDate()}.${date.getFullYear()} on ${date.getHours()+":"+date.getMinutes()}`))
        e.preventDefault()
}

imginsert = (e) => {
    let f = e.target.files[0]
    var reader = new FileReader();
        reader.onloadend = () =>{
            this.setState({imageRaw: reader.result})
        }
        console.log(reader.readAsDataURL(f))
    this.setState({immag:URL.createObjectURL(e.target.files[0])})
    this.state.immag= URL.createObjectURL(e.target.files[0])
}

    contentChange = (e)=>{
        this.setState({content: e})
            }

    render() {
        let options = {
            defaultBlockTag: 'div',
        };
        return (
                <Mutation mutation={postRequest}>
                    {(addPost,{data})=>(<div>
                            <Bar/>
                            <div className={"header-style"}>
                                <input
                                    className={" input-style"} style={{marginBottom: "2%"}}
                                       type={"text"} onChange={e => this.setState({header: e.target.value})}
                                       value={this.state.header}
                                       onFocus={() => (this.state.header == "Hear") ? this.setState({header: ""}) : this.state.header}
                                       placeholder={"Your Header"}/>
                            </div>
                            <div>
                                <input
                                    className={"img-style input-image"} style={{marginBottom: "2%"}}
                                    onChange={this.imginsert}
                                    type="file"/>
                                {
                                    this.state.immag ?
                                        <img
                                            src={this.state.immag}
                                            className="img-style img-style2"
                                            alt={'preview'}
                                        />
                                        :
                                        <div className="img-style img-style2 upload">

                                            <div className={'uploadText'}>
                                                <span>Upload Image</span>
                                                <img src="../icon-image.png" alt={'image icon'}/>
                                            </div>

                                        </div>
                                }
                            </div>
                            <TagPiker
                                onchangeFunction={this.Tagadd}
                                />
                            <ImageUpload
                                content = {this.contentChange}
                            />
                            <button
                                // this.state.content,"qwe",this.state.header,this.state.immag,["qwe","qwe"]
                                onClick={
                                    (e)=> {
                                         addPost({ variables:
                                        {
                                            date: "10-05-2000",
                                            content: JSON.stringify(this.state.content),
                                            header: this.state.header,
                                            image: this.state.imageRaw,
                                            tags: this.state.tags
                                    }})
                                           .then(

                                               data=> this.setState({upload: data.data.addPost.request})
                                           )

                                    }}
                                className={'submit-button'}>
                                btn
                            </button>
                            <footer>hear foter</footer>
                      </div>)
                    }
                </Mutation>
        );
    }
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(PostPage);
