import React, { useState } from "react";
import "../pages/Navbar.css";
import axios from "axios";

function Navbar({ onSearchResult }) {
  const [productId, setProductId] = useState("");

  const getProductById = async () => {
    if (!productId) {
      onSearchResult(null);
      alert("Please enter a product ID.");

      return;
    }

    await axios
      .get(`https://localhost:7048/api/Products/${productId}`)
      .then((response) => {
        onSearchResult(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        onSearchResult(null);
      });
  };

  return (
    <div className='flex gap-5 justify-between items-center py-1.5 px-6 rounded-3xl backdrop-blur-[17.5px] bg-opacity-80 w-full max-w-full flex-wrap sm:flex-nowrap sm:py-4 sm:px-10 bg-[#ffffffff]'>
      <div className='flex gap-2 justify-between items-center py-1.5 my-auto w-full sm:w-auto'>
        <div className='flex justify-center items-center px-0.5'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/679/679821.png'
            className='aspect-[1.14] w-[41px]'
            alt='Logo'
          />
        </div>
        <div className='my-auto uppercase font-extrabold text-lg text-zinc-950'>
          Product Catalog
        </div>
      </div>
      <nav className='flex sm:flex-row flex-col gap-5 justify-center items-center self-stretch my-auto text-base text-center text-neutral-900 font-light w-full sm:w-auto'>
        <input
          type='text'
          placeholder='Search Product by ID'
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            if (!e.target.value) {
              onSearchResult(null);
            }
          }}
          className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-auto'
        />

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          onClick={getProductById}>
          Search
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
