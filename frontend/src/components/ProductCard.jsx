import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [imageFile, setImageFile] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://e-comm-product-k663.vercel.app/api/products/");
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://e-comm-product-k663.vercel.app/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      fetchProducts();
      toast.success("Product deleted successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    console.log("Opening modal for product:", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sku", selectedProduct.sku);
      formData.append("name", selectedProduct.name);
      formData.append("price", selectedProduct.price);
      // if (imageFile) formData.append("image", imageFile);

      const response = await fetch(`https://e-comm-product-k663.vercel.app/api/products/${selectedProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update product");

      setIsModalOpen(false);
      // setImageFile(null); // Reset image file after upload
      fetchProducts();
      toast.success("Product updated successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {      
      
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   setImageFile(e.target.files[0]);
  // };

  return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
    <div className='product-card'>
      {products.map((product) => (
        <div key={product.id} className="card card-side bg-base-100 shadow-sm">
          <figure className="image-body">
            <img
              src={`data:image/png;base64,${JSON.parse(product.images)[0]}`}
              alt={product.name}
              className="w-40 h-40 object-contain"
              />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>${product.price}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => openEditModal(product)}>
                Edit
              </button>
              <button className="btn btn-primary" onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <label>SKU:</label>
              <input
                type="text"
                name="sku"
                value={selectedProduct.sku}
                onChange={handleChange}
                className="input input-bordered w-full"
                />

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                />

              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

              

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
      </>
  );
};

export default ProductCard;
