
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import "../styles/Orders.css";
import axiosInstance from "../context/axiosInstance";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return navigate("/login");

        const response = await axiosInstance.get("profile/");
        setUser(response.data);
        
      } catch (error) {
       
        if (error.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axiosInstance.get("orders/")
    
     

        if (res.status == 200) {
          console.log(res.data)
          setOrders(res.data);
       
        } else {
          setError(data.error || "Failed to load orders");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Calculate order status and remaining days
  const getOrderStatus = (order) => {
    const now = new Date();
    const expiryDate = new Date(order.expires_at);
    const createdDate = new Date(order.created_at);
    
    if (now > expiryDate) {
      return { status: "expired", daysRemaining: 0 };
    } else {
      const diffTime = expiryDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { status: "active", daysRemaining: diffDays };
    }
  };

  // Calculate summary statistics
  const totalOrders = orders.length;
  const activeOrders = orders.filter(order => {
    const now = new Date();
    const expiryDate = new Date(order.expires_at);
    return expiryDate > now;
  }).length;
  const expiredOrders = orders.filter(order => {
    const now = new Date();
    const expiryDate = new Date(order.expires_at);
    return expiryDate <= now;
  }).length;
  const totalCredits = orders.reduce((sum, order) => sum + order.credits, 0);

  if (loading) return (
    <div className="orders-page">
      <div className="orders-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="orders-page">
      <div className="orders-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    </div>
  );

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Your Orders 🧾</h1>
        <div className="orders-summary">
          <div className="summary-card">
            <p className="summary-value">{totalOrders}</p>
            <p className="summary-label">Total Orders</p>
          </div>
          <div className="summary-card">
            <p className="summary-value">{activeOrders}</p>
            <p className="summary-label">Active</p>
          </div>
          <div className="summary-card">
            <p className="summary-value">{expiredOrders}</p>
            <p className="summary-label">Expired</p>
          </div>
          <div className="summary-card">
            <p className="summary-value">{user ? user.credit : "Loading..."}</p>
            <p className="summary-label">Total Credits</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders-container">
          <div className="no-orders-icon">📭</div>
          <p className="no-orders">You haven't purchased any plans yet.</p>
          <button className="browse-plans-btn" onClick={() => navigate("/price")}>
            Browse Plans
          </button>
        </div>
      ) : (
        <div className="orders-container">
          <div className="orders-list">
            {orders.map((order) => {
              const { status, daysRemaining } = getOrderStatus(order);
              return (
                <div key={order.id} className={`order-card ${status}`}>
                  <div className="order-header">
                    <h3>{order.plan}</h3>
                    <span className={`status-badge ${status}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span className="detail-label">Credits:</span>
                      <span className="detail-value">{order.credits}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Order ID:</span>
                      <span className="detail-value">#{order.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Expires:</span>
                      <span className="detail-value">
                        {new Date(order.expires_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {status === "active" && (
                      <div className="detail-row">
                        <span className="detail-label">Active for:</span>
                        <span className="detail-value">{daysRemaining} days</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;