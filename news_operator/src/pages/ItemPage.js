 import React from 'react';
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";
 import FeatureItem from "../components/FeatureItem";
 import Layout from "../components/Layout";
import '../style/ItemPage.css'
 import Button from "rambler-ui/Button";
 import {AddIcon, ChevronRightIcon} from "rambler-ui/icons/forms";
 import IconButton from "rambler-ui/IconButton";
 import {connect} from "react-redux";
 import {bindActionCreators} from "redux";
 import {actionCreators} from "../reducers";


function ItemPage(props) {
    let description;
    let header;
    const isAdmin = true;
    const id = props.params.id;
    const [shopItem,setShopItem] = useState({});
    const [images,setImages] = useState([{contentId: -1,itemId:id,content:'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}]);
    const [featureItems,setFeatureItems] = useState([] );

    let fetchData = async () => {
         description ={ value:'' } ;
          header = { value:'' };
        if(id !== 'editor'){
            let ShopItem =  await props.GetShopItem({ShopItemId:+id});
            setShopItem({...ShopItem[0]});
            let Features = await props.GetChar({id}) || [];
            setFeatureItems(Features);
            let content = await props.GetContent({id}) || [];
            setImages(images);
            console.log(ShopItem,Features,content)
        }
    };
    useEffect(  ()=>{
            fetchData();
        }
    ,[id]);

    let addImage = (e)=>{
        let f = e.target.files[0]
        let reader = new FileReader();
        reader.onloadend = () =>{
            setImages([
                ...images,
                {contentId: -1,itemId:id,content:reader.result}
            ])
        };
        reader.readAsDataURL(f);
    };




    let item = {featureName: 'qwe',featureText: 'qwe'};
    let data = [item,item,item,item,item];
    let imCor = [{url:'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',content: ''},{url:'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',content: ''}]
    let update = async(e)=>{
       let res = await props.AddShopItem({description: description.value, header:header.value, previewImage: null, price:2000});
       console.log(res)
        let id  = res[0].Id || null;
        for(let pt of featureItems){
            if(pt.charId >0)
                continue;
            props.AddChar(pt);
        }
        for(let img of images){
            if(img.contentId > 0)
                continue;
            props.AddItemContent(img);
        }
    };
    console.log(images)
    return (
        <Layout>
                <form >
                    <div className={'carousel'}  >
                        <MyCarousel style={{width: '100%'}} items={images} />
                        <IconButton
                            overlay={<input onChange={addImage} type={'file'} />}
                            onClick={ ()=>{}}
                            style={ {marginLeft: '50%', marginRight: 'auto'} }
                            type={ 'primary' }>
                            <AddIcon/>
                        </IconButton>
                    </div>
                    <div className={'desc'}  >
                        <textarea
                            readOnly={!isAdmin}
                            maxLength={60}
                            className={'header'}
                            defaultValue={shopItem.header}
                            placeholder={'header'}
                            ref={node=>header=node}
                        />
                        <textarea
                            readOnly={!isAdmin}
                            maxLength={280}
                            defaultValue={shopItem.description}
                            placeholder={'описание'}
                            ref={node=>description=node}
                        />
                    </div>
                    <div  className={'FeatureContainer'} >
                        {featureItems.map((k,index)=>
                            <FeatureItem
                                editable = {isAdmin}
                                key={index}
                                onChange={(charName,charContent)=>{
                                    featureItems[index] =  {charId:k.charId,itemId:id,charName,charContent};
                                    setFeatureItems([...featureItems]);
                                    }
                                }
                                {...k}/> ) }
                        { isAdmin ?
                                <div>
                                    <div style={ {marginLeft: 'auto', marginRight: 'auto', width: 65, marginTop: 20} }>
                                        <IconButton
                                        onClick={ ()=>
                                                setFeatureItems([
                                                    ...featureItems,
                                                    {charId: -1,itemId:id,charName:' текст ',charContent:' текст '}
                                                    ]) }
                                            style={ {marginLeft: 'auto', marginRight: 'auto'} }
                                            type={ 'primary' }>
                                            <AddIcon/>
                                        </IconButton>
                                    </div>
                                </div>: null }
                    </div>
                    { isAdmin?  <div className={'save'} >
                            <Button
                                onClick={update}
                                style={{margin: 20}}
                                icon={<ChevronRightIcon />}
                                iconPosition="right"
                                type={'primary'}
                                loading={false}>
                                сохранить
                            </Button>
                        </div> : null }
                </form>
        </Layout>
    );
}
 export default connect(
     state => state,
     dispatch => bindActionCreators(actionCreators, dispatch)
 )(ItemPage);
