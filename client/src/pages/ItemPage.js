 import React from 'react';
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";
 import FeatureItem from "../components/FeatureItem";
 import Layout from "../components/Layout";
import '../style/ItemPage.css'
 import Button from "rambler-ui/Button";
 import {AddIcon, ChevronRightIcon, ClearIcon} from "rambler-ui/icons/forms";
 import IconButton from "rambler-ui/IconButton";
 import {connect} from "react-redux";
 import {bindActionCreators} from "redux";
 import {actionCreators} from "../reducers";
 import Price from "../components/Price";
 import CategoryPiker from "../components/CategoryPiker";
 import NotifyError from "../components/NotifyError";
 import RatingBar from "../components/RatingBar";
 import {instanceOf} from "prop-types";
 import CommentComponent from "../components/Comments/CommentComponent";


function ItemPage(props) {
    let description;
    let header;
    const isAdmin = (props.state.User && props.state.User.rights === 1);
    const id = props.params.id;
    const [shopItem,setShopItem] = useState({});
    const [price,setPrice] = useState(1);
    const [images,setImages] = useState([]);
    let [featureItems,setFeatureItems] = useState([] );
    const [current,setCurrent] = useState(0);
    const [deleteImages,setDeleteImages] = useState([]);
    const [category,setCategory] = useState(1);
    const [notification,setNotification] = useState(false);
    const [error,setError] = useState({});
    const [rating,setRating] = useState(0);

    let color = ()=> {
        switch (rating? +(rating).toFixed(0):0) {
            case 0:  return 'red';
            case 1:  return 'red';
            case 2:  return 'red';
            case 4:  return '#1c7430';
            case 3:  return 'yellow';
            case 5:  return '#1c7430';
        }};

    let fetchData = async () => {
        if(id !== 'editor'){
            let ShopItem =  await props.GetShopItem({ShopItemId:+id});
            setShopItem({...ShopItem[0]});
            setCategory(ShopItem[0] && ShopItem[0].CategoryId || 1);
            let Features = await props.GetChar({id}) || [];
            setFeatureItems(Features);
            let content = await props.GetContent({id}) || [];
            setImages(content);
            setPrice(ShopItem[0] && ShopItem[0].price || 221);
            let  rate = await  props.GetRating({itemId: ShopItem[0].ShopItemId})
            console.log('rate',rate,ShopItem)
            setRating(rate[0] ? rate[0].ratingValue : '')

        }
    };
    useEffect(  ()=>{
            fetchData();
        }
    ,[]);

    const deleteFeature = (charId) =>{
        props.DeleteFeature({charId:charId}).then(r=>props.GetChar({id}).then(Features => setFeatureItems(Features)));
    };

    let addImage = (e)=>{
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>{
            setImages([
                ...images,
                {contentId: -1,itemId:id,content:reader.result}
            ])
        };
        reader.readAsDataURL(f);
    };
    const actionPiker = () =>{
        if (id === 'editor') add().then((val)=> (!val || val && !val.error)? props.router.push('/Catalog') : null
        );
        else update().then(()=>props.router.push('/Catalog'));
    };
    const update= async () =>{
        let params = {
            description: description.value,
            header:header.value,
            price:price,
            categoryId: category,
            ShopItemId: props.params.id
        };
        let res = await props.UpdateShopItem(params);
        for(let pt of featureItems){
            if(pt.charId === -1)
                props.AddChar(pt);
            else props.UpdateFeature(pt)
        }
        for(let img of images){
            if(img.contentId > 0)
                continue;
            props.AddItemContent(img);
        }
        for(let img of deleteImages){
            if(img.contentId < 0)
                continue;
            props.DeleteItemContent(img);
        }
    };

    let add = async()=>{
        let params = { description: description.value,
            header:header.value,
            price:price,
            categoryId: category};
        let res = await props.AddShopItem(
           {
             ...params
                });
        if(res.error){
            setError(res.error);
            setNotification(true);
            return res;
        }
        let id  = res[0] && res[0].Id || null;
        for(let pt of featureItems){
            if(pt.charId === -1)
            props.AddChar({itemId:id, charName: pt.charName,charContent: pt.charContent});
        }
        for(let img of images){
            if(img.contentId > 0)
                continue;
            props.AddItemContent({itemId: id, content:img.content});
        }
    };
    featureItems = featureItems instanceof Array? featureItems : []
    return (
        <Layout>
            <NotifyError notify={notification} close={()=>setNotification(false)} error={error || null} />
                <form>
                    <div className={'carousel'}  >
                        <MyCarousel
                            itemStyle={{backgroundSize: 'contain',backgroundColor: 'white',backgroundPosition: 'center'}}
                            onChange={(e)=>setCurrent(e)}
                            style={{width: '37vw',height: '30vh'}}
                            items={images}
                        />

                        <div className={'Rating'}
                             style={ {backgroundColor: color()}}>
                            {rating? rating.toFixed(0) : 0 }
                        </div>
                        <div style={{display: isAdmin?'flex':'none'}} >
                        <Button
                            overlay={<input onChange={addImage} type={'file'} />}
                            style={ {marginLeft: '44%'} }
                            type={ 'primary' }>
                            <AddIcon color={'white'} />
                        </Button>
                        <Button
                            onClick={ ()=>{
                                setDeleteImages([...deleteImages,{...images[current]}]);
                                images.splice(current,1);
                                setImages([...images]);
                            }}
                            style={ {} }
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                            </div>
                    </div>
                    <div className={'Price'}>
                        <Price
                            addToCart = {(()=>props.AddToCart({...shopItem,previewImage:images[0].content }))}
                            isAdmin={isAdmin}
                            onChange={(value)=>setPrice(value)}
                            price={(+price).toFixed(1)}/>
                    </div>
                    <div className={'desc'}  >
                        <textarea
                            readOnly={!isAdmin}
                            maxLength={60}
                            className={'header'}
                            defaultValue={shopItem.header}
                            placeholder={'Заголовок'}
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
                        <div><h3>Характеристики</h3></div>
                        <table>
                            <tbody>
                        {featureItems.map((k,index)=>
                            <FeatureItem
                                delete={(id)=>deleteFeature(id)}
                                editable = {isAdmin}
                                key={index}
                                onChange={(charName,charContent)=>{
                                    featureItems[index] =  {charId:k.charId,itemId:id,charName,charContent};
                                    setFeatureItems([...featureItems]);
                                    }
                                }
                                {...k}/> ) }
                            </tbody>
                        </table>
                        { isAdmin ?
                                <div>
                                    <div style={
                                        {marginLeft: 'auto', marginRight: 'auto', width: 65, marginTop: 20} }>
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
                        <CategoryPiker
                            categoryId={category}
                            onChange={(e)=> setCategory(e)}
                        />
                            <Button
                                onClick={()=>actionPiker()}
                                style={{margin: 20}}
                                icon={<ChevronRightIcon />}
                                iconPosition="right"
                                type={'primary'}
                                loading={false}>
                                сохранить
                            </Button>
                        </div> : null }
                </form>

            <CommentComponent
                itemId={id}
                {...props}
            />
        </Layout>
    );
}
 export default connect(
     state => state,
     dispatch => bindActionCreators(actionCreators, dispatch)
 )(ItemPage);
