function ProductDetail({ product, maxItemCount, updateStatus, updateQuantity, onClose }) {
  return (
    <div className="product-detail">
      <h1 style={{ borderColor: product.status === 'active' ? 'green' : 'red' }}>{product.name}</h1>
      <p>User Select Quantity: {product.selectedQuantity}</p>
      <p>Quantity: {product.quantity}</p>
      <img src={product.image} alt={product.name} />
      <p>Status: {product.status}</p>
      <button onClick={updateStatus}>Update Status</button>
      <button
        onClick={() =>
          product.selectedQuantity < maxItemCount && updateQuantity(product.selectedQuantity + 1)
        }
      >
        Add item
      </button>
      <button
        onClick={() => product.selectedQuantity > 0 && updateQuantity(product.selectedQuantity - 1)}
      >
        Minus item
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProductDetail;
