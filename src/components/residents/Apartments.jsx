
import  { useState } from "react";
import "./Apartments.css";  


const apartmentsData = {
  "Block A": [
    { name: "Pavani", block: "A", flat: "A234", phone: "9728134546", email: "pavani@gmail.com" },
    { name: "Nihal Varma", block: "A", flat: "A128", phone: "6327828498", email: "nihalvarma100@gmail.com" }
  ],
  "Block B": [
    { name: "Ram", block: "B", flat: "B101", phone: "9876543210", email: "ram11@gmail.com" },
    { name: "Neha", block: "B", flat: "B202", phone: "9988776655", email: "neha99@gmail.com" }
  ]
};

const Apartments = () => {
  const [selectedBlock, setSelectedBlock] = useState("Block A");

  return (
    <div className="apartment_section">

      <div className="apartment_details">
        <h2>Apartments</h2>

        <div className="buttons">
          {Object.keys(apartmentsData).map((block) => (
            <button
              key={block}
              className={selectedBlock === block ? "active" : ""}
              onClick={() => setSelectedBlock(block)}
            >
              {block}
            </button>
          ))}
        </div>

        <div className="grid">
          {apartmentsData[selectedBlock].map((resident, index) => (
            <div key={index} className="card">
              <h3>{resident.name}</h3>
              <p>Block - {resident.block}</p>
              <p>Flat - {resident.flat}</p>
              <p>📞 {resident.phone}</p>
              <p>📧 {resident.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartments;
