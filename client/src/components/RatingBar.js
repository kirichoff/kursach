import React, {useEffect, useState} from 'react';
import {RamblerHoroscopesIcon} from "rambler-ui/icons/services";
import '../style/Rating.css'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {connect} from 'react-redux'
function RatingBar(props) {

    let ar = [1,2,3,4,5];
    const [starsCount,setStart] =useState(-1 || props.rating);
    const [userRating,setUserRating] = useState(false);
    const set =()=>{
        if(props.user)
            props.GetRatingUser({userId: props.user.userId, itemId: props.itemId})
                .then(data=>
                    {
                        setUserRating(!!(data.length && data[0].ratingValue) );
                        setStart(data.length && data[0].ratingValue)
                    }
                );
    } ;

    useEffect(()=>{
        set()
    },[]);
    console.log('RATING',props)
    console.log(starsCount,userRating)
    return (
        <div style={{margin: '10px 0px'}} >
            <div className={'Rating-container'} >
            <div className={'rt-container'} >
            { props.user ?
                    ar.map((item, index) =>
                        <RamblerHoroscopesIcon
                            onMouseOver={ () => !userRating && props.isRedactor?setStart(index+1) : null }
                            onMouseOut={ () =>!userRating && props.isRedactor?setStart(-1) : null  }
                            onClick={ () =>
                                props.isRedactor ?
                                    props.setRating(starsCount)
                                    :
                                    null
                            }
                            key={ index }
                            style={ {
                                width: '50px',
                                height: '50px',
                                fill: starsCount > index || props.rating > index ? 'yellow' : "#E4E4E4"
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

