import React, {useRef, useState} from 'react';
import '../style/featureTable.css'
import TickIcon from 'rambler-ui/icons/forms/TickIcon'
import ClearIcon from 'rambler-ui/icons/forms/ClearIcon'
import EditIcon from 'rambler-ui/icons/forms/EditIcon'
import {RemoveIcon} from "rambler-ui/icons/forms";

function FeatureItem(props) {
    const form = useRef(null);
    const [isEdited, setEdited] = useState(false);

    let submit = (e) => {
        let inputs = form.current.children;
            props.onChange(inputs[0].children[0].value,inputs[1].children[0].value);
        setEdited(!isEdited)
    };

    return (
        <div className={'f-container'} >
            { !isEdited?
                <div className={'f-row'} >
                    <div className={'f-cell'}>{props.charName}</div>
                    <div  className={'f-cell'}>{props.charContent}</div>
                    {props.editable && !isEdited?
                        <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}><EditIcon/></div>
                        :
                        null
                    }
                    {props.editable && !isEdited?
                        <div className={'f-cell icon-cell'} onClick={()=>props.delete(props.charId)}><RemoveIcon/></div>
                        :
                        null
                    }
                </div>
                :
                <div  className={'f-row'} ref={form} >
                    <div className={'f-cell'}><input defaultValue={props.charName}  type="text"/></div>
                    <div className={'f-cell'}><input defaultValue={props.charContent} type="text"/></div>
                    <div className={'f-cell icon-cell'} onClick={submit}><TickIcon/></div>
                    <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}> <ClearIcon/> </div>
                </div>
            }
        </div>
    );
}

export default FeatureItem;
