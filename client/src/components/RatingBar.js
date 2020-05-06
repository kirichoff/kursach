import React, {useEffect, useState} from 'react';
import {RamblerHoroscopesIcon} from "rambler-ui/icons/services";
import '../style/Rating.css'
function RatingBar(props) {

    let ar = [1,2,3,4,5];
    const [starsCount,setStart] =useState(-1);
    const [userRating,setUserRating] = useState(false);
    const set =()=>{
        console.log('set',props)
        if(props.user)
            props.GetRatingUser({userId: props.user.userId, itemId: props.itemId})
                .then(data=>
                    {
                        console.log('data',data)
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
                                props.setRating && props.isRedactor && !userRating ?
                                    props.setRating({
                                        itemId: props.itemId,
                                        ratingValue: index+1,
                                        userId: props.user.userId
                                    })
                                        .then(set())
                                    :
                                    null }
                            key={ index }
                            style={ {
                                width: '50px',
                                height: '50px',
                                fill: starsCount > index ? 'yellow' : "#E4E4E4"
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

export default RatingBar;
