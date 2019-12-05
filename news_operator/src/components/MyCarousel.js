import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class MyCarousel extends React.Component {
    render() {
        return (
            <Carousel style={{width: 1000}}
                      emulateTouch={true}
                      showArrows={false}
                      showStatus={false}
                      interval={1000}
                      autoPlay={true}
                      infiniteLoop={true}
                      showThumbs={false}>
                {this.props.items.map((k,index)=>
                    <div key={index}>
                    <img src={k.url} alt={k.content} />
                    <p className="">{k.content}</p>
                </div>)}
            </Carousel>
        );
    }
}
export default MyCarousel
