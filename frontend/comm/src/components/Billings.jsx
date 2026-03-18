/*import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./Billings.css";

const Billings = () => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [billings, setBillings] = useState([
    { id: 1, flatNo: "A2304", name: "John Doe", amount: 3500, paymentId: "1", paymentDate: "-", status: "Pending" },
  ]);
  const [userRole, setUserRole] = useState(null);
  const [showAddBillingModal, setShowAddBillingModal] = useState(false);
  const [newBilling, setNewBilling] = useState({ name: "", amount: "" });

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile) {
      setUserRole(userProfile.role);
    }
  }, []);

  const handleAdd = () => {
    setShowAddBillingModal(true); // Show the modal form
  };

  const handleAddBillingSubmit = () => {
    if (newBilling.name.trim() === "" || newBilling.amount.trim() === "") {
      alert("Please enter both Name and Amount.");
      return;
    }

    const newBillingRecord = {
      id: Date.now(),
      flatNo: `A${Math.floor(Math.random() * 10000)}`,
      name: newBilling.name,
      amount: parseFloat(newBilling.amount),
      paymentId: `${billings.length + 1}`,
      paymentDate: "-",
      status: "Pending",
    };

    setBillings([...billings, newBillingRecord]);
    setShowAddBillingModal(false);
    setNewBilling({ name: "", amount: "" }); // Reset input fields
  };

  const handleDelete = (id) => {
    setBillings(billings.filter((billing) => billing.id !== id));
  };

  const handlePayClick = () => {
    setShowPaymentOptions(true);
  };

  const handleUPIPayment = (upiLink) => {
    window.open(upiLink, "_blank");
    setShowPaymentOptions(false);
  };

  return (
    <div className="billings-container">
      <h1>Payment Status of Residents</h1>

      {/* Show "Add Billing" button only for admin *//*}
      {userRole === "admin" && (
        <button className="add-button" onClick={handleAdd}>
          <FaPlus /> Add Billing
        </button>
      )}

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Flat No</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Status</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {billings.map((billing, index) => (
            <tr key={billing.id}>
              <td>{index + 1}</td>
              <td>{billing.flatNo}</td>
              <td>{billing.name}</td>
              <td>₹{billing.amount}</td>
              <td>{billing.paymentId}</td>
              <td>{billing.paymentDate}</td>
              <td>
                <button className="pending-status" onClick={handlePayClick}>
                  {billing.status}
                </button>
              </td>
              {userRole === "admin" && (
                <td>
                  <button className="delete-button" onClick={() => handleDelete(billing.id)}>
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payment Options Modal *//*}
      {showPaymentOptions && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Payment Method</h2>
            <button className="pay-option" onClick={() => handleUPIPayment("https://www.phonepe.com/")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEtwEkWo0-MhJ4rSAHbUYk15aPyVEqGm_Tiw&s" alt="PhonePe" className="payment-icon" />
              PhonePe
            </button>
            <button className="pay-option" onClick={() => handleUPIPayment("https://pay.google.com/intl/en_in/about/")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjvIoRTZDGfXckfHpkdfdS9tMUCohAAeFzQ&s" alt="Google Pay" className="payment-icon" />
              Google Pay
            </button>
            <button className="pay-option" onClick={() => handleUPIPayment("https://www.bhimupi.org.in/")}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78EiH-pXyyH2sexIDWdi2QT8bqCRnbGiXzka-zUgQcSiBczxZFhLzsVSLhGG7jr1-6Uk&usqp=CAU" alt="BHIM UPI" className="payment-icon" />
              BHIM UPI
            </button>
            <button className="close-button" onClick={() => setShowPaymentOptions(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Billing Modal *//*}
      {showAddBillingModal && (
        <div className="payadd">
          <div className="payadd-content">
            <h2>Add New Billing</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newBilling.name}
              onChange={(e) => setNewBilling({ ...newBilling, name: e.target.value })}
              placeholder="Enter resident's name"
            />

            <label>Amount (₹):</label>
            <input
              type="number"
              value={newBilling.amount}
              onChange={(e) => setNewBilling({ ...newBilling, amount: e.target.value })}
              placeholder="Enter amount"
            />

            <div className="payadd-buttons">
              <button className="add-button" onClick={handleAddBillingSubmit}>
                Add Billing
              </button>
              <button className="close-button" onClick={() => setShowAddBillingModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billings;*/


/*import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./Billings.css"; // Optional: Add styling as needed

const Billings = () => {
  const [billings, setBillings] = useState([
    { id: 1, flatNo: "A2304", name: "John Doe", amount: 3500, status: "Pending" },
  ]);
  const [newBilling, setNewBilling] = useState({ name: "", amount: "" });

  const handleAddBilling = () => {
    if (!newBilling.name || !newBilling.amount) {
      alert("Please enter both Name and Amount.");
      return;
    }

    const newBill = {
      id: Date.now(),
      flatNo: `A${Math.floor(Math.random() * 10000)}`,
      name: newBilling.name,
      amount: parseFloat(newBilling.amount),
      status: "Pending",
    };

    setBillings([...billings, newBill]);
    setNewBilling({ name: "", amount: "" });
  };

  const handleRazorpayPayment = (billing) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Add your Razorpay API Key here
      amount: billing.amount * 100, // Amount in paise
      currency: "INR",
      name: "Your Company",
      description: `Payment for ${billing.name}`,
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setBillings((prev) =>
          prev.map((b) =>
            b.id === billing.id
              ? { ...b, status: "Paid" }
              : b
          )
        );
      },
      prefill: {
        name: billing.name,
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="billings-container">
      <h1>Billing Management</h1>

      <div className="add-billing">
        <input
          type="text"
          placeholder="Resident Name"
          value={newBilling.name}
          onChange={(e) => setNewBilling({ ...newBilling, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBilling.amount}
          onChange={(e) => setNewBilling({ ...newBilling, amount: e.target.value })}
        />
        <button onClick={handleAddBilling}><FaPlus /> Add Billing</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Flat No</th>
            <th>Name</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((billing) => (
            <tr key={billing.id}>
              <td>{billing.flatNo}</td>
              <td>{billing.name}</td>
              <td>₹{billing.amount}</td>
              <td>{billing.status}</td>
              <td>
                {billing.status === "Pending" ? (
                  <button onClick={() => handleRazorpayPayment(billing)}>
                    Pay Now
                  </button>
                ) : (
                  <span>Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billings;
*/

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./Billings.css";

const Billings = () => {
  const [billings, setBillings] = useState([
    { id: 1, flatNo: "A2304", name: "John Doe", amount: 3500, status: "Pending" },
  ]);
  const [newBilling, setNewBilling] = useState({});
  const [userRole, setUserRole] = useState(null);

  // Get user role from localStorage
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile && userProfile.role) {
      setUserRole(userProfile.role);
    }
  }, []);

  const handleAddBilling = () => {
    if (!newBilling.name || !newBilling.amount) {
      alert("Please enter both Name and Amount.");
      return;
    }

    const newBill = {
      id: Date.now(),
      flatNo: `A${Math.floor(Math.random() * 10000)}`,
      name: newBilling.name,
      amount: parseFloat(newBilling.amount),
      status: "Pending",
    };

    setBillings([...billings, newBill]);
    setNewBilling({ name: "", amount: "" });
  };

  const handleDelete = (id) => {
    setBillings(billings.filter((billing) => billing.id !== id));
  };

  const handleRazorpayPayment = (billing) => {
    const options = {
      key: "rzp_test_dsVcKukDI9yfCV", // Add your Razorpay API Key here
      amount: billing.amount * 100, // Amount in paise
      currency: "INR",
      name: "Your Company",
      description: `Payment for ${billing.name}`,
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setBillings((prev) =>
          prev.map((b) =>
            b.id === billing.id
              ? { ...b, status: "Paid" }
              : b
          )
        );
      },
      prefill: {
        name: billing.name,
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="billings-container">
      <h1>Billing Management</h1>

      {/* Add Billing - Only for Admin */}
      {userRole === "admin" && (
        <div className="add-billing">
          <input
            type="text"
            placeholder="Resident Name"
            value={newBilling.name || ""}
            onChange={(e) => setNewBilling({ ...newBilling, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBilling.amount || ""}
            onChange={(e) => setNewBilling({ ...newBilling, amount: e.target.value })}
          />
          <button onClick={handleAddBilling}><FaPlus /> Add Billing</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Flat No</th>
            <th>Name</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {billings.map((billing) => (
            <tr key={billing.id}>
              <td>{billing.flatNo}</td>
              <td>{billing.name}</td>
              <td>₹{billing.amount}</td>
              <td>{billing.status}</td>
              <td>
                {billing.status === "Pending" ? (
                  <button onClick={() => handleRazorpayPayment(billing)}>
                    Pay Now
                  </button>
                ) : (
                  <span>Paid</span>
                )}
              </td>
              {userRole === "admin" && (
                <td>
                  <button onClick={() => handleDelete(billing.id)}>
                    <FaTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billings;

