import React, {useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import Bar from "../components/Bar";
import Layout from "../components/Layout";
import NewsRendering from "../components/NewsRendering";
const item = {url: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
content: 'content'
};
const array = [item,item,item,item];
function Home(props) {
    let brakePoints = [100, 950];
    let images = [];
    const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92,643];
    for(let i = 0; i< imgId.length; i++){
        const ih = 200 + Math.floor(Math.random()*(215-415)+415);
        images.push("https://unsplash.it/550/" + ih + "?image=" + imgId[i]);
    }
    const [state,count] = useState({text:"TEXTTT"});
    return (
        <Layout>
            <div style={{width: '100%'}} >
            <MyCarousel items ={ array }/>
            <div style={{margin:'100px'}} > </div>
                <NewsRendering images = {images} brakePoints = {brakePoints}  />
            </div>
        </Layout>
    );
}

export default Home;
