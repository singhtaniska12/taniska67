import React from 'react';
import './Body.css';

const Body = () => {
    useeffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error('Error fetching products:', err));
    }, []);

    
    return (
        <div className="body">
            <div className="body__container">
                <img 
                    className="body__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/BAU/OP_Dec/D70978891_WLD_BAU_1500x300.jpg"
                    alt="banner"
                />
               {ProductDetails.map(product => <Products key={product.id} product={product} />)}
            </div>
        </div>
    );
};

export default Body;