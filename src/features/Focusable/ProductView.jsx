import './style.css';

import { useState } from 'react';
import ProductList from './ProductList';

const list = [
  {
    name: 'Nike Air Max 97',
    quantity: 97,
    image: 'https://picsum.photos/100',
    status: 'active',
    selectedQuantity: 0
  },
  {
    name: 'Adidas Superstar',
    quantity: 267,
    image: 'https://picsum.photos/100',
    status: 'inactive',
    selectedQuantity: 0
  },
  {
    name: 'Louis Vuitton',
    quantity: 45,
    image: 'https://picsum.photos/100',
    status: 'inactive',
    selectedQuantity: 0
  }
];

function Component() {
  const [products, setProducts] = useState(list);
  const [selectedIndex, setSelectedIndex] = useState(null);

  function updateProduct(updateValue) {
    setProducts((products) => {
      return products.map((product, i) => {
        if (i === selectedIndex) {
          return { ...product, ...updateValue };
        }
        return product;
      });
    });
  }

  return (
    <>
      <ProductList
        items={products}
        selectedIndex={selectedIndex}
        updateProduct={updateProduct}
        onItemClick={setSelectedIndex}
      />
    </>
  );
}

export { Component };
