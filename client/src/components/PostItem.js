import React, {useEffect, useState} from 'react';
import '../style/Home.css'
import Button from "rambler-ui/Button";
import {AddIcon, ClearIcon, TickIcon} from "rambler-ui/icons/forms";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {connect} from "react-redux";
function PostItem(props) {

    const [image,setImage] = useState(props.image);
    let node;
    let addImage = (e)=>{
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onload =()=> setImage(reader.result);
        reader.readAsDataURL(f)
    };
    const save = ()=>{
        console.log('save')
        if(props.id<0){
            props.SetPost({text:node.value,image: image}).then(()=>props.onSave());
        }
        else {
            props.UpdatePost({postId:props.id,text:node.value,image:image}).then(()=>props.onSave())
        }
    };

    return (
            <div className={'item-home-margin'} style={{margin:'70px',marginTop: '10px'}} >
                <div className={'item-home'} >
                    <div className={'item-home-container'} style={{display: 'flex'}} >
                        <div
                            style={{
                                backgroundSize: 'cover',
                                background:`url(${image})`
                                }}
                            className={'no-image'}
                        >
                            {image? '' : 'Изображение 360 x 280' }
                        </div>
                    <textarea
                        readOnly={!props.isAdmin}
                        maxLength={580}
                        defaultValue={props.text}
                        placeholder={'текст'}
                        ref={n=> node=n }
                    />
                    </div>
                    <div style={{display: props.isAdmin?'flex':'none'}} >
                        <Button
                            overlay={<input onChange={addImage} type={'file'} />}
                            style={ {marginLeft: '13%'} }
                            type={ 'outline' }>
                            <AddIcon color={'blue'} />
                        </Button>
                        <Button
                            onClick={ ()=>{
                                if(props.id>0)
                                props.DeletePost({postId: props.id}).then(()=>props.onSave())
                            }}
                            style={ {} }
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                        <Button
                            onClick={()=>save()}
                            style={ {} }
                            type={ 'outline' }
                        >
                            <TickIcon color={'blue'} />
                        </Button>
                    </div>
                </div>

            </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PostItem);
