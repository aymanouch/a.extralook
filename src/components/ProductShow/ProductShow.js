import React from 'react';
import LeftSidePro from './LeftSidePro';
import RightSidePro from './RightSidePro';
import "./productshow.scss";
const ProductShow = (props) => {
    return (
        <div className="product-show center__padding">
            <LeftSidePro product={props.product}/>
            <RightSidePro product={props.product}/>
            
        </div>
    )
}

export default ProductShow
