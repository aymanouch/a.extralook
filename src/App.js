import React, {useState, useEffect} from 'react';
import "./app.scss";
import Footer from './components/footer/Footer';
import Infosell from './components/InfoSell/Infosell';
import Loading from './components/loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import ProductShow from './components/ProductShow/ProductShow';
import {commerce} from './lib/commerce';
const App = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
         fetchProduct();
         fetchCategory();
    },[])
    const fetchProduct = async () => {
        await commerce.products.list().then((res) => {
            setProducts(res.data);
            setProduct(res.data[res.data.length - 1]);
            setIsLoading(false);
        }).catch((error)=>{
            console.log("we have problem with fetching data ", error);
        });
    }
    const fetchCategory = async () => {
        await commerce.categories.list().then((res) => {
            setCategory(res.data);
        }).catch((error)=>{
            console.log("we have problem with fetching data ", error);
        });
    }
    function handleClick(id) {
        const item = products.filter(item => {
            if(item.id===id) {
                return item;
            }
        });
        setProduct(item[0]);

    }
    if(isLoading) {
        return <Loading />;
    } else  {
        return (
            <div className="app">
                <Navbar 
                links={["children", "women", "men"]}
                logo={{name:"logo", src:"./logo.png"}}
                />
                <ProductShow product={product} />
                <Infosell />
                <Products categories={category} products={products} handleClick={(id) => {handleClick(id)}}/>
                <Footer />
            </div>
        )
    }
}

export default App
