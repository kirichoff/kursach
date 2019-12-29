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
const array = [
    {content: './images/index-bg-1.jpg'},
    {content: './images/index-bg-2.jpg'},
    {content: './images/index-bg-3.jpg'}
];


const data = [
        {image: './images/bus.png',id: 3,text:
        'Продукция Минского автомобильного завода – это техника, соответствующая экологическим стандартам Евро-2, Евро-3, Евро-4, Евро-5, Е' +
        'вро-6Под маркой «МАЗ» с конвейера завода сходят седельные тягачи, бортовые автомобили, шасси под установку различного спецоборудования.Всего более 500 моделей и модификаций.'},
            {image: '',id: 1,text:
            'Продукция Минского автомобильного завода – это техника, соответствующая экологическим стандартам Евро-2, Евро-3, Евро-4, Евро-5, Е' +
            'вро-6Под маркой «МАЗ» с конвейера завода сходят седельные тягачи, бортовые автомобили, шасси под установку различного спецоборудования.Всего более 500 моделей и модификаций.'}
        ];


function Home(props) {
    const [images,setImages] = useState([]);
    const [current,setCurrent] = useState(0);

    const getImages = ()=>{
      props.GetImages().then(data=>setImages(data));
    };

    useEffect(()=>{
        getImages()
    },[images.length]);

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
            {/*<MyCarousel items ={ array }/>*/}
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
                            onClick={ ()=>props.DeleteImages({imageId: images[current].imageId}).then(()=>getImages())}
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                    </div>
                </div>
                {data.map((item,index)=>
                    <PostItem
                        key={index}
                        id={item.id}
                        isAdmin={isAdmin}
                        image={item.image}
                        text={item.text}
                    />)}
            </div>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
