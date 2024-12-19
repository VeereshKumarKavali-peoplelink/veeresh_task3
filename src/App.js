import logo from './logo.svg';
import './App.css';



import React, { useState } from "react";
import axios from "axios";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null); 

  const handleChange = (e) => {
    setError(""); 
    setResponseData("");
    setPhoneNumber(e.target.value);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if input is empty
    if (phoneNumber.trim() === "") {
      setError("Phone number cannot be empty.");
      return;
    }

    try {
      // Post phone number to API
      const response = await axios.post("https://chimpu.online/api/post.php", {
        phonenumber: phoneNumber,
      });

      console.log("Success:", response.data.msg);
      setResponseData(response.data); 
      setPhoneNumber(""); 
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to submit phone number.");
      setResponseData(null); 
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="phone-container">
          <label htmlFor="phoneNumber" className="phone-label">
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="phone number"
            value={phoneNumber}
            onChange={handleChange}
            className='phone-input'
          />
          {error && (
            <p className='error-msg'>
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className='button'
        >
          Submit
        </button>
      </form>

      {/* Display API Response Data */}
      {responseData && (
        <div
          className='response-container'
        >
          <h4>Response:</h4>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}




export default App;
