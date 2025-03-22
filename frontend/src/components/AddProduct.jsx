import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({ sku: '', name: '', price: '' });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("sku", formData.sku);
    formdata.append("name", formData.name);
    formdata.append("price", formData.price);

    images.forEach((image) => {
      formdata.append("images", image);
    });

    try {
      const requestOptions = {
        method: "POST",
        body: formdata,
      };

      const response = await fetch("http://localhost:3000/api/products", requestOptions);

      if (response.ok) {
        // alert('Product added successfully');
        setFormData({ sku: '', name: '', price: '' });
        setImages([]);
        toast.success("Product added successfully.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error occurred. Try again later.');
    }
  };

  return (<>
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-lg w-full max-w-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Product Form
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">SKU ID</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-xl bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-200 dark:bg-gray-600 p-2 rounded-lg"
              >
                <span>{image.name}</span>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-500 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
