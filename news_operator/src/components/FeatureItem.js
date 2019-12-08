import React, {useRef, useState} from 'react';
import '../style/featureTable.css'
import TickIcon from 'rambler-ui/icons/forms/TickIcon'
import ClearIcon from 'rambler-ui/icons/forms/ClearIcon'
import EditIcon from 'rambler-ui/icons/forms/EditIcon'

function FeatureItem(props) {
    const form = useRef(null);
    const [isEdited, setEdited] = useState(false);

    function submit(e) {
        let inputs = form.current.children;
        if(props.onChage){
            props.onChage(inputs[0].children[0].value,inputs[1].children[0].value)
        }
    }
    return (
        <div className={'f-container'} >
            { !isEdited?
                <div className={'f-row'} >
                    <div className={'f-cell'}>{props.featureName}</div>
                    <div  className={'f-cell'}>{props.featureText}</div>
                    {props.editable && !isEdited?
                        <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}><EditIcon/></div>
                        :
                        null
                    }
                </div>
                :
                <div  className={'f-row'} ref={form} >
                    <div className={'f-cell'}><input type="text"/></div>
                    <div className={'f-cell'}><input type="text"/></div>
                    <div className={'f-cell icon-cell'} onClick={submit}><TickIcon/></div>
                    <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}> <ClearIcon/> </div>
                </div>
            }
        </div>
    );
}

export default FeatureItem;
