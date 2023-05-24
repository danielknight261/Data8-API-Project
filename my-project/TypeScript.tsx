// Import necessary dependencies
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define the structure of the API response
interface ApiResponse {
  Result: string;
  [key: string]: any;
}

// Define the main App component
const App: React.FC = () => {
  // Define state variables
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [level, setLevel] = useState<string>("Address");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  // Retrieve the API key from environment variables
  const apiKey = process.env.REACT_APP_API_KEY;

  // Function to validate the provided email with the specified level
  const validateEmail = (email: string, level: string): Promise<ApiResponse> => {
    // API endpoint
    const url = "https://webservices.data-8.co.uk/EmailValidation/IsValid.json";
    // Prepare the data to be sent to the API
    const data = {
      username: `apikey-${apiKey}`,
      password: "",
      email: email,
      level: level,
      options: {},
    };

    // Make a POST request to the API and return the promise
    return axios
      .post<ApiResponse>(url, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error", error);
      });
  };

  // Function to handle the form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // If the form is already submitting, prevent double submission
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Validate the email and handle the promise
    validateEmail(email, level)
      .then((response) => {
        // If the email is valid, show the response details
        if (response.Result === "Valid") {
          setResponseDetails(JSON.stringify(response, null, 2));
        } else {
          // If the email is not valid, show an error message
          setErrorMessage("Please enter a valid email address");
        }
      })
      // After the validation, set isSubmitting back to false
      .finally(() => setIsSubmitting(false));
  };

  // Function to reset the form and clear all fields
  const handleRefresh = () => {
    setName("");
    setMessage("");
    setEmail("");
    setLevel("Address");
    setErrorMessage(null);
    setResponseDetails(null);
  };

  // Render the component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <form
        className="p-6 bg-white rounded shadow-md w-80 relative"
        onSubmit={handleSubmit}
      >
        {/* Render the form here */}
        {/* ... */}
      </form>
    </div>
  );
};

// Export the App component as the default export
export default App;
