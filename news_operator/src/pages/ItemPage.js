 import React from 'react';
import FeatureTable from "../components/FeatureTable";
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";
 import FeatureItem from "../components/FeatureItem";
 import Layout from "../components/Layout";
import '../style/ItemPage.css'
 import Button from "rambler-ui/Button";
 import {ChevronRightIcon} from "rambler-ui/icons/forms";

function ItemPage(props) {
    let description;
    const isAdmin = true;

    const [images,setImages] = useState([]);
    const [featureItems,setFeatureItems] = useState([]);

    let item = {featureName: 'qwe',featureText: 'qwe'};
    let data = [item,item,item,item,item];
    let imCor = [{url:'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',content: ''},{url:'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',content: ''}]
    let update = (e)=>{
        console.log  ('sub')
        e.preventDefault();
    };
    return (
        <Layout>
            { !isAdmin?
                <div>
            <img src={props.image} alt='image'/>

            <MyCarousel items={[]} />

                    {props.header}
            <p>{props.description}</p>
            <div className={'FeatureContainer'} >
                {data.map((k,index)=><FeatureItem key={index} {...k}/> )}
            </div>
                </div>
                :
                <form onSubmit={update}>
                    <div className={'carousel'}  >
                        <MyCarousel style={{width: '100%'}} items={imCor} />
                    </div>
                    <div className={'desc'}  >
                        <textarea readOnly={!isAdmin} maxLength={60}  className={'header'} placeholder={'header'} />
                        <textarea readOnly={!isAdmin}  maxLength={280}  placeholder={'описание'} ref={node=>description=node} />
                    </div>
                    <div  className={'FeatureContainer'} >
                        {data.map((k,index)=>
                            <FeatureItem
                                editable
                                key={index}
                                onChange={(featureName,featureText)=>{
                                    data[index]= {featureName,featureText}
                                    }
                                }
                                {...k}/> )
                        }
                    </div>
                    <div className={'save'} >
                        <Button
                            style={{margin: 20}}
                            icon={<ChevronRightIcon />}
                            iconPosition="right"
                            type={'primary'}
                            loading={false}>
                            сохранить
                        </Button>
                    </div>
                </form>
            }
        </Layout>
    );
}

export default ItemPage;
