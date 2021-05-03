import React, {useState} from 'react';
import logo from "../../images/a.extralook.png";
import "./navbar.scss";
const Navbar = (props) => {
const [controlNav, setContronlNav] = useState(true);
const [formHide, setFormHide] = useState(false);
    return (
        <div className={`navbar center__padding ${controlNav ? "hide-navbar" : "show-navbar"}`} id="navbar" >
            <div className="first-side__navbar">
                <div className="logo__navbar" id="logo">
                    <img alt={props.logo.name} src={logo}/>
                </div>
                <ul className="last-item__links">
                    {
                        props.links.map((item, index) => <li key={index}>{item}</li>)
                    }
                </ul>
                <div className="navbar-controle" onClick={()=> setContronlNav(!controlNav)}>
                    <span className="material-icons">{controlNav ? "menu" : "close"}</span>
                </div>
            </div>
            <div className="last-side__navbar">
                <ul className="last-side__form">
                    <li><span className="material-icons search-icon" onClick={()=> setFormHide(!formHide && !controlNav)}>search</span><input type="search" placeholder="search..." className={`${formHide ? "show-input" : "hide-input"}`}/></li>
                    <li><span className="material-icons">perm_identity</span>account</li>
                    <li><span className="material-icons">add_shopping_cart</span>bag</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar