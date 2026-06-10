import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAdminAuth } from "../context/AdminAuthContext";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  const { logout } = useAdminAuth();

  // 🌷 form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // 🌿 ORDERS
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(data.reverse());
  };

  // 🌿 PRODUCTS
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(data.reverse());
  };

  // 🌷 CLOUDINARY UPLOAD
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wiora_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvtdcxm23/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setPreview(product.image);
  };

  const handleSaveProduct = async () => {
    if (!name || !price) {
      alert("Please fill required fields");
      return;
    }

    try {
      let imageURL = preview;

      if (image) {
        imageURL = await uploadImageToCloudinary(image);
      }

      if (editId) {
        await updateDoc(doc(db, "products", editId), {
          name,
          price: Number(price),
          description,
          category,
          image: imageURL,
        });

        alert("Product updated ✏️");
      } else {
        await addDoc(collection(db, "products"), {
          name,
          price: Number(price),
          description,
          category,
          image: imageURL,
        });

        alert("Product added ✨");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "products", id));
    fetchProducts();

    alert("Product deleted 🗑️");
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    setPreview(null);
    setEditId(null);
  };

  return (
    <motion.div className="admin-container">

      {/* 🌿 TOP BAR (FIXED LOGOUT HERE) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="admin-title" style={{ margin: 0 }}>
          Admin Dashboard 🧺
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#e8c1c7",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Logout 🚪
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>

        <button
          className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      {/* ORDERS */}
      {activeTab === "orders" && (
        <div>
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <p><strong>Order:</strong> {order.id}</p>
              <p><strong>Total:</strong> Rs {order.total}</p>
            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS */}
      {activeTab === "products" && (
        <div className="admin-grid">

          {/* FORM */}
          <div className="admin-card">
            <h3>{editId ? "Edit Product ✏️" : "Add Product 🌷"}</h3>

            <input
              className="admin-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="admin-input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="admin-input"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <textarea
              className="admin-input"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="file-upload-wrapper">
              <label className="file-upload-label">
                📷 Choose Image
                <input type="file" onChange={handleImageChange} />
              </label>
            </div>

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginTop: "10px",
                }}
              />
            )}

            <button className="admin-btn" onClick={handleSaveProduct}>
              {editId ? "Update Product ✏️" : "Add Product 🧺"}
            </button>

            {editId && (
              <button onClick={resetForm} style={{ marginTop: "10px" }}>
                Cancel ❌
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="admin-card">
            <h3>Products ({products.length})</h3>

            {products.map((p) => (
              <div key={p.id} className="product-admin-item">
                <img src={p.image} className="product-admin-thumb" />

                <div>
                  <h4>{p.name}</h4>
                  <p>Rs {p.price}</p>

                  <button onClick={() => handleEditClick(p)}>
                    Edit ✏️
                  </button>

                  <button onClick={() => handleDeleteProduct(p.id)}>
                    Delete 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </motion.div>
  );
}

export default Admin;