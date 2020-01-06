import React, {useEffect, useState} from 'react';
import {RamblerHoroscopesIcon} from "rambler-ui/icons/services";
import '../style/Rating.css'
function RatingBar(props) {

    let ar = [1,2,3,4,5];
    const [starsCount,setStart] =useState(-1);
    const [userRating,setUserRating] = useState(false);
    const [rating,setRating] = useState(0);

    const set =()=>{
        props.GetRating({itemId: props.itemId})
            .then(data=>setRating(data[0].ratingValue));
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
    },[props.user]);
    let color = ()=> {
        let b = rating/10*10;
        switch (b) {
            case 0:  return 'red';
            case 1:  return 'red';
            case 2:  return 'red';
            case 4:  return '#1c7430';
            case 3:  return 'yellow';
            case 5:  return '#1c7430';
        }};
    return (
        <div style={{margin: '10px 0px'}} >
            <div className={'Rating-container'} >
            <div className={'Rating'}
                 style={ {backgroundColor: color()}}>
                {rating? rating.toFixed(1) : 0 }
            </div>
            <div className={'rt-container'} >
            { props.user ?
                    ar.map((item, index) =>
                        <RamblerHoroscopesIcon
                            onMouseOver={ () => !userRating?setStart(index+1) : null }
                            onMouseOut={ () =>!userRating?setStart(-1) : null  }
                            onClick={ () =>
                                props.setRating && !userRating ?
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
