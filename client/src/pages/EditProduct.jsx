import React, { useState, useEffect } from "react";
import axios from "axios";

function EditModal({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://localhost:7048/api/Products/${product.id}`,
        formData
      );
      console.log("Product updated successfully");
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Edit Product</h2>
        <div className='space-y-4'>
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
