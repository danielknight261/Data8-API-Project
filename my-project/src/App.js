import React, { useState } from 'react';
import axios from 'axios'

const App = () => {
  // Define state variables
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseDetails, setResponseDetails] = useState(null);

  // In practice would put in env
  const apiKey = "NHWE-QAUR-DUI4-S3S6";

  // POST request to an email validation service
  const validateEmail = (email) => {
    const url = "https://webservices.data-8.co.uk/EmailValidation/IsValid.json";
    const data = {
      "username": `apikey-${apiKey}`,
      "password": "",
      "email": email,
      "level": "Syntax",
      "options": {}
    };

    // axios.post returns a promise that resolves to the response data
    return axios.post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error", error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true); 

    // Call validateEmail and handle its promise
    validateEmail(email)
      .then((response) => {
        if (response.Result === "Valid") {
          setResponseDetails(JSON.stringify(response, null, 2));  //If valid return response
        } else {
          setErrorMessage('Please enter a valid email address');
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Submit</button>
        {responseDetails && <textarea>{responseDetails}</textarea>}
      </form>
    </div>
  );
}

export default App;
