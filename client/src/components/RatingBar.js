import React, {useEffect, useState} from 'react';
import {RamblerHoroscopesIcon} from "rambler-ui/icons/services";
import '../style/Rating.css'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {connect} from 'react-redux'
function RatingBar(props) {

    let ar = [1,2,3,4,5];
    useEffect(()=>{
        props.set()
    },[]);
    return (
        <div style={{margin: '10px 0px'}} >
            <div className={'Rating-container'} >
            <div className={'rt-container'} >
            { props.user ?
                    ar.map((item, index) =>
                        <RamblerHoroscopesIcon
                            onMouseOver={ () => !props.userRating && props.isRedactor?props.setStart(index+1) : null }
                            onMouseOut={ () =>!props.userRating && props.isRedactor?props.setStart(-1) : null  }
                            onClick={ () =>
                                props.SetRating && props.isRedactor && !props.userRating ?
                                    props.SetRating({
                                        itemId: props.itemId,
                                        ratingValue: index+1,
                                        userId: props.user.userId
                                    })
                                        .then(
                                            props.set(props.user)
                                        )
                                    :
                                    null }
                            key={ index }
                            style={ {
                                width: '50px',
                                height: '50px',
                                fill: props.starsCount > index ? 'yellow' : "#E4E4E4"
                            } }
                            viewBox={ '0 0 20 20' }
                        />
                    )

                :
                null
            }
            </div>
            </div>
        </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(RatingBar);

