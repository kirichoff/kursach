import React from 'react';
import FeatureItem from "./FeatureItem";


function FeatureTable(props) {

    let item = {featureName: 'qwe',featureText: 'qwe'};
    let data = [item,item,item,item,item];

    return (
        <div>
            {data.map((k,index)=><FeatureItem editable  key={index} {...k}/> )}
        </div>
    );
}

export default FeatureTable;
