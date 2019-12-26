import React, {useEffect, useState} from 'react';
import Notification from "rambler-ui/Notification/Notification";

function NotifyError(props) {
    return (
        <Notification
            isOpened={props.notify}
            title="Ошибка"
            body={props.error && props.error.message  || ''}
            onRequestClose={() => props.close && props.close()}
        />
    );
}

export default NotifyError;
