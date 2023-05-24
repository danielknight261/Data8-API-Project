import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // State variables for inputs, levels and response
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const [level, setLevel] = useState("Address");
  const [responseDetails, setResponseDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  // API key from environment variables
  const apiKey = process.env.REACT_APP_API_KEY;

  // Function to make POST request to the email validation service
  const validateEmail = (email, level) => {
    const url = "https://webservices.data-8.co.uk/EmailValidation/IsValid.json";
    const data = {
      // Data to be sent to the API
      username: `apikey-${apiKey}`,
      password: "",
      email: email,
      level: level,
      options: {},
    };

    // axios.post makes the API request and returns a promise
    return axios
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Call validateEmail and handle its promise
    validateEmail(email, level)
      .then((response) => {
        if (response.Result === "Valid") {
          setResponseDetails(JSON.stringify(response, null, 2)); //If valid return response
        } else {
          setErrorMessage("Please enter a valid email address");
          console.log(response)
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  // Refresh function to reset all state
  const handleRefresh = () => {
    setName("");
    setMessage("");
    setEmail("");
    setLevel("Address");
    setErrorMessage(null);
    setResponseDetails(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <form
        className="p-6 bg-white rounded shadow-md w-80 relative"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-bold">Contact Form</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write you message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Message below input if email if invalid */}
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Advanced Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mb-2 cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Syntax">Syntax</option>
            <option value="MX">MX</option>
            <option value="Server">Server</option>
            <option value="Address">Address</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
        {responseDetails && <pre>{responseDetails}</pre>}
      </form>
    </div>
  );
};

export default App;
