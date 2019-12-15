import React, {useState} from 'react';
import Button from "rambler-ui/Button";



function Price(props) {
    return (
        <div style={{float:'right'}}>
            <div style={{display:'inline-block',margin: '50px 50px'}} >
                {props.isAdmin?
                    <input style={{textAlign:'center'}}  type="number"/>
                :
                    <h4>
                        {props.price}
                    </h4>
                }
            </div>
            <Button type={'primary'}>
                Добавить в корзину
            </Button>
        </div>
    );
}

export default Price;
