import React, { useState } from "react";
import axios from "axios";

function AddProduct({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7048/api/Products",
        formData
      );
      console.log("Product added successfully", response.data);
      onAdd(response.data);
      onClose(); 
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Add Product</h2>
        <div className='space-y-4'>
          <input
            type='text'
            name='id'
            value={formData.id}
            onChange={handleChange}
            placeholder='Product ID'
            className='w-full border p-2 rounded'
          />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Product Name'
            className='w-full border p-2 rounded'
          />
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Price'
            className='w-full border p-2 rounded'
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            className='w-full border p-2 rounded'
          />
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            placeholder='Category'
            className='w-full border p-2 rounded'
          />
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            placeholder='Stock'
            className='w-full border p-2 rounded'
          />
          <input
            type='text'
            name='imageUrl'
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder='Image URL'
            className='w-full border p-2 rounded'
          />
        </div>
        <div className='flex justify-end space-x-4 mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded'>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 text-white px-4 py-2 rounded'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
