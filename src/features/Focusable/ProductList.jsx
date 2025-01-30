import ProductDetail from './ProductDetail';
function ProductList({
  items = [],
  maxItemCount = 5,
  selectedIndex,
  updateProduct,
  onItemClick = () => {}
}) {
  function updateStatus() {
    updateProduct({ status: items[selectedIndex].status === 'active' ? 'inactive' : 'active' });
  }

  function updateQuantity(newQuantity) {
    updateProduct({ selectedQuantity: newQuantity });
  }
  return (
    <>
      {selectedIndex === null ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} onClick={() => onItemClick(index)}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <img src={item.image} />
                </td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ProductDetail
          product={items[selectedIndex]}
          maxItemCount={maxItemCount}
          updateStatus={updateStatus}
          updateQuantity={updateQuantity}
          onClose={() => onItemClick(null)}
        />
      )}
    </>
  );
}

export default ProductList;
