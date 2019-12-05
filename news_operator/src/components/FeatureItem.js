import React, { useState } from 'react';

function FeatureItem(props) {
    console.log(props)
    const [isEdited, setEdited] = useState(false);
    function submit(e) {
        console.log(e.target.children[0].value);
        e.preventDefault()
    }
    return (
        <div>
            <div>
            { !isEdited?
                <div>
                    <div>{props.featureName}</div>
                    <div>{props.featureText}</div>
                </div>
                :
                <form onSubmit={submit} >
                    <input type="text"/>
                    <input type="text"/>
                    <input type="submit" value={'клац'}  />
                    <div onClick={()=>setEdited(!isEdited)} >close</div>
                </form>
            }
            </div>
            {props.editable && !isEdited?
                <div onClick={()=>setEdited(!isEdited)} >edit</div>
                :
                null
            }
        </div>
    );
}

export default FeatureItem;
