import React from 'react';
import Button from "rambler-ui/Button";



function Price(props) {
    return (
        <div style={{float:'right'}}>
            <div style={{display:'inline-block',margin: '50px 50px'}} >
                {props.isAdmin?
                    <input
                        style={{textAlign:'center',border:'none'}}
                        value={props.price}
                        min={1}
                        onChange={(e,value)=> {
                            props.onChange(e.target.value)}
                        }
                        type="number"/>
                :
                    <h4>
                        {props.price} BYN
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
