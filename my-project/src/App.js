import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // Define state variables
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [level, setLevel] = useState("Syntax");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseDetails, setResponseDetails] = useState(null);

  // In practice would put in env
  const apiKey = process.env.REACT_APP_API_KEY;

  // const levels = ["Syntax", "MX", "Server", "Address"];
  

  // POST request to an email validation service
  const validateEmail = (email, level) => {
    const url = "https://webservices.data-8.co.uk/EmailValidation/IsValid.json";
    const data = {
      username: `apikey-${apiKey}`,
      password: "",
      email: email,
      level: level,
      options: {},
    };

    // axios.post returns a promise that resolves to the response data
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
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  // refresh function  reset all state
  const handleRefresh = () => {
    setEmail('');
    setLevel('Syntax');
    setErrorMessage(null);
    setResponseDetails(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <form
        className="p-6 bg-white rounded shadow-md w-80 relative"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Message below input if email if invalid */}
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Level
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
        <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit">
        Submit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button" 
        onClick={handleRefresh}
        >Refresh
        </button>
        </div>
        {responseDetails && <pre>{responseDetails}</pre>}
      </form>
    </div>
  );
};

export default App;
