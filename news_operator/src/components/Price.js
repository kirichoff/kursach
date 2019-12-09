import React, {useState} from 'react';
import Button from "rambler-ui/Button";



function Price(props) {
    return (
        <div>
            <div style={{display:'inline-block'}} >
                {props.price}
            </div>
            <Button type={'primary'}>
                Добавить в корзину
            </Button>
        </div>
    );
}

export default Price;
