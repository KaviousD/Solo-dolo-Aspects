import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:3000/products') // Replace with your backend URL
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => {
                console.log('Error fetching product data:', error);
            });
    };

    const handleAddToCart = (productId) => {
        const selectedProduct = products.find(product => product.id === productId);
        if (selectedProduct) {
            setCart(prevCart => [...prevCart, selectedProduct]);
        }
    };

    const handleCalculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, product) => total + product.price, 0);
        console.log('Total Price:', totalPrice.toFixed(2));
    };

    return (
        <div>
            <header>
                <h1 className="title">Demigod's S-tier Armory</h1>
                <nav>
                    <ul className="nav-bar">
                        <li><a href="/">Home</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className="products-container">
                    {products.map(product => {
                        const imageUrl = `http://localhost:3001/images/${product.image}`;

                        return (
                            <div key={product.id} className="product">
                                <img src={imageUrl} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                    <p>{product.description}</p>
                                    <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <button onClick={handleCalculateTotalPrice} className="calculate-btn">Calculate Total Price</button>
        </div>
    );
}

export default App;
