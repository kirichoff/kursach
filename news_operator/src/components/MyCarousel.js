import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

function MyCarousel(props) {
    return (
        <Carousel
            width={ props.style && props.style.width || '100%' }
            emulateTouch={ true }
            showArrows={ false }
            showStatus={ false }
            interval={ 5000 }
            autoPlay={ true }
            infiniteLoop={ true }
            showThumbs={ false }
            onChange ={(e)=> props.onChange && props.onChange(e) || null }
            >
            { props.items.map((k, index) =>
                <div key={ index }>
                    <img src={ k.content } alt={'img'}/>
                </div>) }
        </Carousel>
    );
}

export default MyCarousel
