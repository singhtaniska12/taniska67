import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <main style={{padding: '1rem'}}>
      <h2>Product Details</h2>
      <p>Showing details for product ID: {id}</p>
    <div>
      <h3>product.name</h3>
       <h3>product.price
       </h3>
   <h3>product.quantity</h3>
    </div>
    </main>
  );
}