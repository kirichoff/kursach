import React, {useState} from 'react';
import Button from "rambler-ui/Button";



function Price(props) {
    return (
        <div style={{float:'right'}}>
            <div style={{display:'inline-block',margin: '50px 50px'}} >
                {props.isAdmin?
                    <input
                        defaultValue={props.price}
                        style={{textAlign:'center'}}
                        min={1}
                        onChange={(e,value)=> {
                            props.onChange(e.target.value)}
                        }
                        type="number"/>
                :
                    <h4>
                        {props.price}
                    </h4>
                }
            </div>
            {!props.isAdmin?
                <Button type={'primary'}>
                    Добавить в корзину
                </Button>
                :
                null
            }
        </div>
    );
}

export default Price;
