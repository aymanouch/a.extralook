import React, {useState} from 'react'
import "./products.scss";
const Products = (props) => {
    const [products, setProducts] = useState(props.products)
    function clickCard(id) {
        props.handleClick(id);
        document.getElementsByTagName('html')[0].scrollIntoView({ behavior: 'smooth', block: 'start'});;
    }
    function handleClick(cat) {
        setProducts(shortProduct(cat, props.products))
    }
    return (
        <div className="product center__padding">
            <h1>Products</h1>
            <ul>
                <li onClick={() => handleClick('all')}>all</li>
                {
                    props.categories.map(item => {
                        return <li key={item.id} onClick={()=> handleClick(item.name)}>{item.name}</li>;
                    })
                }
            </ul>
            <div className="products_items">
                {products.map(item => {
                    //create the card product
                    return(
                    <div className="item_card" key={item.id} onClick={() => {clickCard(item.id)}}>
                        <div className="image-container">
                            <img alt={item.name} src={item.media.source} />
                        </div>
                        <div className="info-product">
                            <div className="name">{item.name}<br /> <span>{item.categories[0].name}</span></div>
                            <div className="price">{item.price.raw} MAD</div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
//short the product use the categories 
function shortProduct(cat, arr) {
      if(cat ==="all") {
          return arr;
      } 
      return arr.filter(item => {
        if(checkGate(item.categories, cat)) {
          return item;
        }
      })
}
function checkGate(arr, cat) {
    for(let i=0; i<arr.length; i++) {
        if(arr[i].name===cat) {
            return true;
        }
    }
    return false;
}

export default Products
