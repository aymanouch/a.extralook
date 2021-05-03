import React, {useState, useEffect} from 'react'
import delivery  from "../../images/delivery.svg";
import contact from "../../images/contact.svg";
import cash from "../../images/cash.svg";
import "./infosell.scss";
const Infosell = () => {
    //initialize the states 
    const [data, setData] = useState([""]);
    const [icons] =useState({
        delivery:delivery,
        contact:contact,
        cash:cash
    });
    //useEffect
    useEffect(()=> {
        //fetch data from json file 
        const data = require("./information.json");
        setData(data.information)
    })
    return (
        <div className="information_sell center__padding">
            <ul>
                {data.map(item => {
                    return(<li>
                        <img alt={item.name} src={icons[item.name]} />
                        <div><h2>{item.name}</h2>
                        <p>{item.description}</p></div>
                    </li>);
                })}
            </ul>  
        </div>
    )
}

export default Infosell
