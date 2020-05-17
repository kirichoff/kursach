import React, {useRef, useState} from 'react';
import '../style/featureTable.css'
import TickIcon from 'rambler-ui/icons/forms/TickIcon'
import ClearIcon from 'rambler-ui/icons/forms/ClearIcon'
import EditIcon from 'rambler-ui/icons/forms/EditIcon'
import {RemoveIcon} from "rambler-ui/icons/forms";

function FeatureItem(props) {
    const input1 = useRef(null);
    const input2 = useRef(null);

    const [isEdited, setEdited] = useState(false);

    let submit = (e) => {
        let val1 =  input1.current.value,
            val2 = input2.current.value;

        props.onChange(val1,val2);
        setEdited(!isEdited)
    };

    return (
        <tr className={'f-container'} >
            { !isEdited?
                <>
                    <td className={'f-cell'}>{props.charName}</td>
                    <td  className={'f-cell'}>{props.charContent}</td>
                    {props.editable && !isEdited?
                        <td className={'f-cell icon-cell'}>
                            <span onClick={()=>setEdited(!isEdited)}><EditIcon/></span>
                            <span onClick={()=>props.delete(props.charId)}><RemoveIcon/></span>
                        </td>

                        :
                        null
                    }
                </>
                :

                     <>
                    <td  className={'f-cell'}><input ref={input1}  defaultValue={props.charName}  type="text"/></td>
                    <td  className={'f-cell'}><input ref={input2} defaultValue={props.charContent} type="text"/></td>
                    <td className={'f-cell icon-cell'}>
                    <span  onClick={submit}><TickIcon/></span>
                    <span  onClick={()=>setEdited(!isEdited)}> <ClearIcon/> </span>
                    </td>
                     </>

            }
        </tr>
    );
}

export default FeatureItem;
