import React, {useEffect, useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import Layout from "../components/Layout";
import '../style/Home.css'
import PostItem from "../components/PostItem";
import Button from "rambler-ui/Button";
import {AddIcon, ClearIcon} from "rambler-ui/icons/forms";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import IconButton from "rambler-ui/IconButton";
import {Link} from "react-router";
function Home(props) {
    const [images,setImages] = useState([]);
    const [current,setCurrent] = useState(0);
    const [data,setData] = useState([]);
    const getImages = ()=>{
      if (props.GetImages)
          props.GetImages().then(data=>setImages(data));
    };

    const getPosts = ()=> props.GetPosts().then(res=>setData(res));

    useEffect(()=>{
        console.log('effect')
        getPosts();
        getImages();
        console.log(data)
    },[]);

    let isAdmin = (props.state.User && props.state.User.rights === 1) ;
    let addImage = (e)=>{
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>{
                props.SetImages({content: reader.result}).then(()=>getImages());
        };
        reader.readAsDataURL(f);
    };
    return (
        <Layout>
            <div style={{width: '100%'}} >
                <div className={'carousel'}  >
                    <MyCarousel
                        onChange={(e)=>setCurrent(e)}
                        style={{width: '100%'}}
                        items={images}
                    />
                    <div style={{display: isAdmin?'flex':'none'}} >
                        <Button
                            overlay={<input onChange={addImage} type={'file'} />}
                            style={ {marginLeft: '44%'} }
                            type={ 'primary' }>
                            <AddIcon color={'white'} />
                        </Button>
                        <Button
                            onClick={
                                ()=>props.DeleteImages({imageId: images[current].imageId}).then(()=>getImages())}
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                    </div>
                </div>
                {data.map((item,index)=>
                    <PostItem
                        key={index}
                        id={item.postId}
                        text={item.text}
                        onSave={()=>{ console.log('beforeGetPost',data);  getPosts()}}
                        isAdmin={isAdmin}
                        image={item.image}
                    />)}
                <IconButton
                    style={{margin: 'auto',width:'45px',display: isAdmin?'block':'none'}}
                    onClick={ ()=>{
                        setData(
                            [...data,
                            {postId: -1,text:'',image:''}])
                    }}
                    type={ 'primary' }>
                    <AddIcon/>
                </IconButton>
            </div>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
