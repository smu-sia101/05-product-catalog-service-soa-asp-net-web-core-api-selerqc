import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditModal from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/editproduct' element={<EditModal />} />
          <Route path='/AddProduct' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
