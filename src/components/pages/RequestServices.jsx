
// import { useEffect, useState } from "react";
// import "./ui/RequestServices.css"; 

// const RequestServices = () => {
//   const [serviceType, setServiceType] = useState("Select Services");
//   const [name, setName] = useState("");
//   const [flatNo, setFlatNo] = useState("");
//   const [phone, setPhone] = useState("");
//   const [notes, setNotes] = useState("");
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/requests") 
//       .then((res) => res.json())
//       .then((data) => setRequests(data))
//       .catch((err) => console.error("Error fetching requests:", err));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !flatNo || !phone) return;

//     const newRequest = { type: serviceType, name, flatNo, phone, notes };
//     setRequests([...requests, newRequest]);
//     setName("");
//     setFlatNo("");
//     setPhone("");
//     setNotes("");
//   };

//   return (
  
//       <div className="request-services-page">
//         <div className="request-services-container">
//           <h2 className="title">Request Services</h2>
    
//           <div className="form-group">
//             <label>Select Service Type:</label>
//             <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="dropdown">
//               <option>Select Service</option>
//               <option>Water Can</option>
//               <option>House Keeping</option>
//               <option>Gas</option>
//               <option>Plumbing</option>
//               <option>Garbage Collection</option>
//             </select>
//           </div>
    
//           <form className="form-container" onSubmit={handleSubmit}>
//             <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
//             <input type="text" placeholder="Flat No." value={flatNo} onChange={(e) => setFlatNo(e.target.value)} className="input-field" required />
//             <input type="text" placeholder="Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" required />
//             <textarea placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field"></textarea>
//             <button type="submit" className="submit-btn">Submit Request</button>
//           </form>
    
//           <h3 className="title">Submitted Service Requests</h3>
//           <div className="request-list">
//             {requests.map((req, index) => (
//               <div key={index} className="request-item">
//                 <strong>{req.type}</strong>
//                 <p><strong>Name:</strong> {req.name}</p>
//                 <p><strong>Flat No.:</strong> {req.flatNo}</p>
//                 <p><strong>Phone:</strong> {req.phone}</p>
//                 {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
//               </div>
//             ))}
//           </div>
    
//           <h3 className="title">Vendors List</h3>
//           <table className="vendor-table">
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Name</th>
//                 <th>Service</th>
//                 <th>Company</th>
//                 <th>Phone No</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendors.map((vendor, index) => (
//                 <tr key={vendor.id}>
//                   <td>{index + 1}</td>
//                   <td>{vendor.name}</td>
//                   <td>{vendor.service}</td>
//                   <td>{vendor.company}</td>
//                   <td>{vendor.phone}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="add-vendor-btn">Add Vendor</button>
//         </div>
//       </div>
//     );
    
// };

// export default RequestServices;


import { useEffect, useState } from "react";
import "./ui/RequestServices.css"; 

const RequestServices = () => {
  const [serviceType, setServiceType] = useState("Select Service");
  const [name, setName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [requests, setRequests] = useState([]);
  const [vendors] = useState([
    { id: 1, name: "Aman", service: "Water Can", company: "Pure Water Limited", phone: "9022569918" },
  ]);

  // Fetch all service requests from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !flatNo || !phone || serviceType === "Select Service") {
      alert("Please fill all required fields!");
      return;
    }

    const newRequest = { type: serviceType, name, flatNo, phone, notes };

    try {
      const response = await fetch("http://localhost:8080/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      const savedRequest = await response.json();
      setRequests([...requests, savedRequest]);

      // Clear form fields
      setServiceType("Select Service");
      setName("");
      setFlatNo("");
      setPhone("");
      setNotes("");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="request-services-page">
      <div className="request-services-container">
        <h2 className="title">Request Services</h2>

        <div className="form-group">
          <label>Select Service Type:</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="dropdown">
            <option>Select Service</option>
            <option>Water Can</option>
            <option>House Keeping</option>
            <option>Gas</option>
            <option>Plumbing</option>
            <option>Garbage Collection</option>
          </select>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
          <input type="text" placeholder="Flat No." value={flatNo} onChange={(e) => setFlatNo(e.target.value)} className="input-field" required />
          <input type="text" placeholder="Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" required />
          <textarea placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="input-field"></textarea>
          <button type="submit" className="submit-btn">Submit Request</button>
        </form>

        <h3 className="title">Submitted Service Requests</h3>
        <div className="request-list">
          {requests.map((req, index) => (
            <div key={index} className="request-item">
              <strong>{req.type}</strong>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Flat No.:</strong> {req.flatNo}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            </div>
          ))}
        </div>

        <h3 className="title">Vendors List</h3>
        <table className="vendor-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Service</th>
              <th>Company</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={vendor.id}>
                <td>{index + 1}</td>
                <td>{vendor.name}</td>
                <td>{vendor.service}</td>
                <td>{vendor.company}</td>
                <td>{vendor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-vendor-btn">Add Vendor</button>
      </div>
    </div>
  );
};

export default RequestServices;
