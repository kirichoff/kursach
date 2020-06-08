import React, {useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Popup} from "rambler-ui/Popup";

function MyCarousel(props) {
    console.log(props)
    const [close, setClose] = useState( [].fill(false,props.items.length) )
    return (
        <Carousel
            width={props.style && props.style.width || '100%'}
            emulateTouch={true}
            showArrows={false}
            showStatus={false}
            interval={3000}
            stopOnHover={false}
            autoPlay={true}
            infiniteLoop={true}
            onChange={(e) => props.onChange && props.onChange(e) || function () {
            }}
        >
            {props.items.map((k, index) =>
                <div
                    onClick={() => {
                        close[index] = true;
                        setClose([...close])
                    }}
                    style={{
                        backgroundImage: `url(${k.content})`,
                        backgroundRepeat: 'no-repeat',
                        height: props.style.height,
                        width: props.style.width,
                        ...props.itemStyle
                    }} key={index}>
                    <Popup
                        title="картинка"
                        showClose
                        isOpened={close[index]}
                        backdropColor="blue"
                        onRequestClose={() => {
                            close[index] = false;
                            setClose([...close])
                        }}>
                        <div style={{
                            backgroundImage: `url(${k.content})`,
                            backgroundRepeat: 'no-repeat',
                            height: '52vh',
                            width: '52vw',
                            backgroundSize: 'contain'
                        }}>
                        </div>
                    </Popup>
                </div>)}
        </Carousel>
    );
}

export default MyCarousel
