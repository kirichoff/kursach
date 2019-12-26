import React, {useState} from 'react';
import '../style/Home.css'
import Button from "rambler-ui/Button";
import {AddIcon, ClearIcon, TickIcon} from "rambler-ui/icons/forms";
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
        if(props.id>0){

        }
        else {

        }
    };

    return (
            <div style={{margin:'70px'}} >
                <div className={'item-home'} >
                    <div style={{display: 'flex'}} >
                        <div
                            style={{background:`url(${image})`,
                                backgroundSize: 'cover'
                            }}
                            className={'no-image'}
                        >{image? '' : 'Изображение 360 x 280' }</div>
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
                                setImage('')
                            }}
                            style={ {} }
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                        <Button
                            onClick={save}
                            style={ {} }
                            type={ 'outline' }>
                            <TickIcon color={'blue'} />
                        </Button>
                    </div>
                </div>

            </div>
    );
}

export default PostItem;
