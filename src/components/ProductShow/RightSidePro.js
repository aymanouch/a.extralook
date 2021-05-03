import React, {useEffect, useState, useRef} from 'react';
import parse from 'html-react-parser';
import './rightproductside.scss';
import ReactStars from "react-rating-stars-component";
import gsap from "gsap";


//THE FORM FUNCTION COMPONENT  **************************************

function FormDemande(props) {
    const product=props.product;
    return(<div className="wraper-input">
    <h2>demmande</h2>
    <div className="close-btn_demande" onClick={props.handleClicl2}><span className="material-icons">close</span></div>
    <form id="myFormDem">
        <div>
            <input type="text"  name="product" className="product" defaultValue={product.name} readOnly/>
        </div>
        <div><input type="text"  name="price" className="price" defaultValue={`${product.price.raw} MAD`} readOnly/></div>
        <div className="img"><img alt={product.name} src={product.media.source} /></div>
        <div>
            <input type="text" placeholder="full name" name="full-name" className="name" id="fullname"/>
            <br /><span id="error_name" className="error-span"></span>
        </div>
        <div>
            <input type="text" placeholder="address" name="address" className="address"id="address"/>
            <br /><span id="error_address" className="error-span"></span>
        </div>
        <div>
            <input type="text" placeholder="phone" name="phone" className="phone" id="phone-number"/>
            <br /><span id="error_phone" className="error-span"></span>
        </div>
        <button className="mybtn" onClick={(e) => {submitData(e, product.name, product.price.raw)}}>acheter</button>
    </form>
</div>);
}

//THE RIGHT SIDE COMPONENT **************************************************************

const RightSidePro = (props) => {
    //initialize our variables
    const product = props.product
    const [size] = useState(window.innerWidth);
    const [showInput, setShowInput] = useState(false);
    const [showInputDes, setShowInputDes] = useState(false);
    const wraperInput = useRef(null);

    //useEffect
    useEffect(() => {
        window.addEventListener("scroll", detecteScroll);
     }, []);
    //create our funtion for generate events
    //>>>>>>>>>>>> function show the form 
    function handleClicl(e,size) {
        const timeline1=gsap.timeline();
           if(size < 900) {
               setShowInput(true);
               timeline1.to(e.target, {opacity:0, display:"none"})
               .to(wraperInput.current, {height:"600px"});
           } else {
            setShowInputDes(true);
            timeline1.from(".wraper-desktop", {opacity:0});
           }

    }
    //>>>>>>>>>>>>>>> function hide the from 
    function handleClicl2(size) {
        const timeline2=gsap.timeline({onComplete:changeState});
        if(size < 900) {
            setShowInput(false);
            timeline2.to(wraperInput.current, {height:"0"})
            .to(".demande-btn button", {opacity:1, display:"inline"}, "<0.2");
        } else {
            timeline2.to(".wraper-desktop .desktop-form *", {opacity:0})
            .to(".wraper-desktop .desktop-form", {width:0}, "<0.3");
        }
        function changeState() {
            setShowInputDes(false);
        }
    }
    return (
        <>
        <div className="right-side__product">
            <div className="text-behind"><h1>{product.categories[0].name}</h1></div>
            <div className="small-text__first">
                <h3>fabrick backpacks</h3>
            </div>
            <div className="title-big">
                <h1><span>Solid</span> {product.name}</h1>
                <div className="stars">
                    <ReactStars
                       count={5}
                       size={32}
                       activeColor="#1089ff"
                       value={3}
                       edit={false}
                    />
                </div>
            </div>
            <div className="product-key">
                product Code : {product.created}
            </div>
            <div className="colors-product">
                {
                    product.variant_groups.map(item => {
                          return (
                            <span key={item.id}
                            style={{backgroundColor:item.name}}
                            ></span>
                          );
                    })
                }
            </div>
            <div className="price-product">
                <h1>{`${product.price.raw} MAD`}</h1>
                <span>free shoping worldwide</span>
            </div>
            <div className="demande-btn">
                <button onClick={(e) => {handleClicl(e, size)}} className="mybtn">demmande</button>
                <div className="wraper-container" ref={wraperInput}>
                {showInput && (<FormDemande product={product}  handleClicl2={()=>handleClicl2(size)}/>)}
                </div>
            </div>
            <div className="description-product">
                {parse(product.description)}
            </div>
        </div>
        <div className="wraper-desktop">
        {showInputDes && (<div className="desktop-form">
            <FormDemande product={product}  handleClicl2={()=>handleClicl2(size)}/>
            <div className="form-img">
                <h1>You can <span>Contact us</span> in social media</h1>
                <ul>
                    <li><a href="https://www.facebook.com/Aextralook-101879155406498"><span></span>fb</a></li>
                    <li><a href="https://instagram.com/a.extralook?igshid=1dv6slbc9v0sj"><span></span>in</a></li>
                </ul>
            </div>
            </div>)}
        </div>
        </>
    )
}
//the scroll dedtecte function for hide and show the form demande
function detecteScroll() {
    var myElement= document.getElementsByClassName("right-side__product")[0];
    // console.log(`the position scroll is :${window.scrollY}`);
    if( myElement.scrollHeight> window.scrollY) {
        gsap.to('.demande-btn', {opacity:1, height:"auto", display:"block", ease:"ease-in"});
    } else {
        gsap.to('.demande-btn', {opacity:0, height:0, display:"none"});
    }
    
}
//create the funtion send data to the google sheets
function submitData(e, product, price) {
    e.preventDefault();
    //the elements
    const fullname = document.getElementById("fullname"),
    address = document.getElementById("address"),
    phoneNum =document.getElementById("phone-number"), 
    errSpanName=document.getElementById("error_name"),
    errSpanAdd=document.getElementById("error_address"),
    errSpanPhone=document.getElementById("error_phone");
    
    if(checkText(fullname.value, errSpanName) && checkText(address.value, errSpanAdd) && checkNumber(phoneNum.value, errSpanPhone)) {
        fetch(`${process.env.REACT_APP_GOOGLE_SHEETS_API}`, {
	method: "POST",
	body: JSON.stringify({"data": {"product":product,"price":price,"full-name":fullname.value,"address":address.value,"phone":phoneNum.value}}),
}).then(res =>{
	if (res.status === 201){
        // SUCCESS
        console.log("the data sending")
	}
	else{
        // ERROR
        console.log("you have a error")
	}
});
    }

//create the check text function
function checkText(text, elt) {
const lenghtError = "this field must be great than 3";
       if(text.length >= 3) {
           elt.innerHTML ="";
           return true;
       } else {
           elt.innerHTML = lenghtError;
           return false;
       }
    }
//create the check number function
function checkNumber(text, elt){
    const lenghtError = "this field must be containe the phone number";
    if(text.length >= 3 && text.length <=12) {
        elt.innerHTML="";
        return true;
    } else {
        elt.innerHTML = lenghtError;
       return false;
    }
}
}
export default RightSidePro
