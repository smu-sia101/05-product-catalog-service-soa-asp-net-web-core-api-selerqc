import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import AddProduct from "./AddProduct";
import EditModal from "./EditProduct";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get("https://localhost:7048/api/Products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  const handleSearchResult = (product) => {
    setSearchResult(product);
  };
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`https://localhost:7048/api/Products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar onSearchResult={handleSearchResult} />
      <div className='bg-gray-100 min-h-screen flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center text-gray-800 py-6'>
          Product Catalog
        </h1>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4'
          onClick={() => setIsAddModalOpen(true)}>
          Add Product
        </button>

        {searchResult && (
          <div className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow mb-6'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Product Id: {searchResult.id}
            </h2>
            <p className='text-gray-600'>Product Name: {searchResult.name}</p>
            <p className='text-gray-600'>Price: ${searchResult.price}</p>
            <p className='text-gray-500'>
              Description: {searchResult.description}
            </p>
            <p className='text-gray-500'>Category: {searchResult.category}</p>
            <p className='text-gray-500'>Stock: {searchResult.stock}</p>
            <img
              src={searchResult.imageUrl}
              alt={searchResult.name}
              className='w-full h-32 object-cover rounded-md mt-2'
              style={{ objectFit: "contain" }}
            />
            <div className='mt-4 flex space-x-2'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                onClick={() => handleEditClick(searchResult)}>
                Edit
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
                onClick={() => handleDeleteClick(searchResult.id)}>
                Delete
              </button>
            </div>
          </div>
        )}
        {!searchResult && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 w-full max-w-7xl'>
            {products.map((product) => (
              <div
                key={product.id}
                className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow'>
                <h2 className='text-xl font-semibold text-gray-700'>
                  Product Id: {product.id}
                </h2>
                <p className='text-gray-600'>Product Name: {product.name}</p>
                <p className='text-gray-600'>Price: ${product.price}</p>
                <p className='text-gray-500'>
                  Description: {product.description}
                </p>
                <p className='text-gray-500'>Category: {product.category}</p>
                <p className='text-gray-500'>Stock: {product.stock}</p>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-full h-32 object-cover rounded-md mt-2'
                  style={{ objectFit: "contain" }}
                />
                <div className='mt-4 flex space-x-2'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                    onClick={() => handleEditClick(product)}>
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
                    onClick={() => handleDeleteClick(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
      {selectedProduct && (
        <EditModal
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditProduct}
        />
      )}
    </>
  );
}

export default Dashboard;
