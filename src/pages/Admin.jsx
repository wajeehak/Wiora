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

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  const CATEGORIES = [
    { label: "🧷 Keychains / Bag Charms", value: "keychains" },
    { label: "👜 Bags", value: "bags" },
    { label: "🌸 Flowers / Bouquets", value: "flowers" },
    { label: "☕ Coasters", value: "coasters" },
  ];

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(data.reverse());
  };

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data.reverse());
  };

  // 🌿 STATUS UPDATE (NEW FEATURE ONLY)
  const updateOrderStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), {
      status,
    });

    fetchOrders();
  };

  // 🌿 DELETE ORDER (NEW FEATURE ONLY)
  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "orders", id));
    fetchOrders();
  };

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "wiora_upload");

  // Debug: show everything being sent
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dvtdcxm23/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.error.message);
  }

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
    if (!name || !price) return;

    let imageURL = preview;

    if (image) {
      imageURL = await uploadImageToCloudinary(image);
    }

    const payload = {
      name,
      price: Number(price),
      description,
      category,
      image: imageURL,
    };

    if (editId) {
      await updateDoc(doc(db, "products", editId), payload);
    } else {
      await addDoc(collection(db, "products"), payload);
    }

    resetForm();
    fetchProducts();
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

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <motion.div className="admin-container">

      {/* TOP BAR (UNCHANGED) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 className="admin-title">Admin Dashboard 🧺</h1>

        <button onClick={logout}>
          Logout 🚪
        </button>
      </div>

      {/* TABS (UNCHANGED) */}
      <div className="admin-tabs">
        <button onClick={() => setActiveTab("orders")}>
          Orders
        </button>

        <button onClick={() => setActiveTab("products")}>
          Products
        </button>
      </div>

      {/* ORDERS */}
      {activeTab === "orders" && (
        <div>
          {orders.map((order) => (
            <div key={order.id}>

              <p><strong>Order:</strong> {order.id}</p>
              <p><strong>Total:</strong> Rs {order.total}</p>
              <p><strong>Status:</strong> {order.status || "pending"}</p>

              {/* 🌷 NEW ACTIONS */}
              <button onClick={() => updateOrderStatus(order.id, "shipped")}>
                Mark Shipped 📦
              </button>

              <button onClick={() => updateOrderStatus(order.id, "delivered")}>
                Mark Delivered ✅
              </button>

              <button onClick={() => handleDeleteOrder(order.id)}>
                Delete 🗑️
              </button>

            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS (UNCHANGED STRUCTURE) */}
      {activeTab === "products" && (
        <div className="admin-grid">

          <div className="admin-card">
            <h3>{editId ? "Edit Product ✏️" : "Add Product 🌷"}</h3>

            <input
              className="admin-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              className="admin-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />

            <select
              className="admin-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <textarea
              className="admin-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <input type="file" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
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
              <button onClick={resetForm}>
                Cancel ❌
              </button>
            )}
          </div>

          <div className="admin-card">
            <h3>Products ({products.length})</h3>

            {products.map((p) => (
              <div key={p.id}>
                <p>{p.name}</p>
                <p>{p.category}</p>

                <button onClick={() => handleEditClick(p)}>
                  Edit ✏️
                </button>

                <button onClick={() => handleDeleteProduct(p.id)}>
                  Delete 🗑️
                </button>
              </div>
            ))}
          </div>

        </div>
      )}
    </motion.div>
  );
}

export default Admin;