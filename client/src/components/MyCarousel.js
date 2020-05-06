import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

function MyCarousel(props) {
    console.log(props)
    return (
        <Carousel
            width={ props.style && props.style.width || '100%' }
            emulateTouch={ true }
            showArrows={ false }
            showStatus={ false }
            interval={ 3000 }
            stopOnHover={false}
            autoPlay={ true }
            infiniteLoop={ true }
            onChange ={(e)=> props.onChange && props.onChange(e) || function () {} }
            >
            { props.items.map((k, index) =>
                <div style={{
                    backgroundImage: `url(${k.content})`,
                    backgroundRepeat:'no-repeat',
                    backgroundSize: 'cover',
                    height: props.style.height,
                    width: props.style.width,
                }} key={ index }>
                </div>) }
        </Carousel>
    );
}

export default MyCarousel
