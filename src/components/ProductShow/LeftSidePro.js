import React, {useEffect, useState, useRef} from 'react'
import "./leftsideproduct.scss";
const LeftSidePro = (props) => {
    const [sourceImg, setSourceImg] = useState('');
    const prevId= useRef();
    useEffect(()=> {
        prevId.current = props.product.id;
    })
    function handleClick (url) {
         setSourceImg(url);
    }
    return (
        <div className="left-side__product">
            <div className="container-img__product">
                <div className="circle"></div>
                <div className="product__img">
                <img src={props.product.id ===prevId.current ? sourceImg : props.product.media.source }
                    alt={props.product.name}
                    />
                </div>
            </div>
            <div className="slider_images__left">
                <div className="sliders">
                    <div className="container_slider">
                        <ul className="bxslider">
                            {
                             props.product.assets.map( item => {
                                 return (
                                     <li key={item.id} onClick={()=> handleClick(item.url)}>
                                         <img src={item.url} alt={props.product.name} />
                                     </li>
                                 )
                             })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidePro
