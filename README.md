# Data8 Contact Form - Email Validation

## Tech Stack
This project utilizes Javascript, React, Tailwind and Axios.

## Live Link & Localhost setup
- Vercel: [Live Application](https://data8-api-project.vercel.app/)
- For Localhost, clone the repository, Install dependencies:, Change to the appropriate directory Start the local server: npm run start

## Stretch Goals
- Explore the advanced options further.
- Integrate with a backend (possibly MongoDB). It would be intriguing to see how this integrates with a user management system that includes attributes like name, age, and email.
-Have a play around with some testing

## Documentation
- [Data8 isValid Email API](https://www.data-8.co.uk/resources/api-reference/emailvalidation/isvalid/#options)
- [Axios Docs](https://axios-http.com/docs/intro)
- [React and Tailwind setup guide](https://tailwindcss.com/docs/guides/create-react-app)

## Development Plan
1. Connect to API using POSTMAN with successful response ✅
2. Begin the build, establish simple connection using JSON Endpoint "https://webservices.data-8.co.uk/EmailValidation/IsValid.json" and return Syntax level ✅
3. Define states for email, errors, submission, and response ✅
4. Include all 4 of the search options (update state, define array and update data object) ✅
5. Improve the input and response layout; "textarea" is not the correct choice ✅
6. Add a refresh button to solve the issue when using the same email but changing the level and then submitting ✅
7. Move API Key to an ENV file ✅
8. Host on Vercel ✅
9. Upgrade documentation ✅
10. Expand the contact form to include Name and Description fields ✅
11. Make sure form submission in the email address prevents a submission with error message if not valid✅
12. Improve error handling

