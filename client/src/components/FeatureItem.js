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
        let input = input1.current.children[0].value,
            input2 = input2.current.children[0].value;
        props.onChange(input1,input2);
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
                    <td ref={input1} className={'f-cell'}><input  defaultValue={props.charName}  type="text"/></td>
                    <td ref={input2}  className={'f-cell'}><input defaultValue={props.charContent} type="text"/></td>
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
