import React, {useEffect} from 'react';
import gsap from "gsap";
import "./loading.scss";
const Loading = () => {
    useEffect(()=> {
        gsap.from(".loading_container span", {y:-60, duration:1, color:"white", stagger:.33, repeat:-1})
    });
    return (
        <div className="loading">
            <div className="loading_container">
                  <h1>Loading <span>.</span><span>.</span><span>.</span></h1>
            </div>
        </div>
    )
}

export default Loading
