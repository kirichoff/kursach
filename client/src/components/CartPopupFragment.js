import React from 'react';
import {Popup} from "rambler-ui/Popup";
import Button from "rambler-ui/Button";

function CartPopupFragment(props) {
    return (
        <Popup
            title=" "
            isOpened={props.isOpen}
            backdropColor="blue"
            okButton={
                <Button type="primary" size="small" onClick={ props.cancel}>
                    Ок
                </Button>
            }
            onRequestClose={props.cancel}>
            <h3>
                Заказ успешно оформлен! ✔
            </h3>
        </Popup>
    );
}

export default CartPopupFragment;