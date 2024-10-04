// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../css/SignUpPage.css";

// const SignUpPage: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({ setIsLoggedIn }) => {
//     const navigate = useNavigate();
    
//     // State for form inputs
//     const [fullName, setFullName] = useState("");
//     const [street, setStreet] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [country, setCountry] = useState("");
//     const [postalCode, setPostalCode] = useState("");
//     const [age, setAge] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [interests, setInterests] = useState<string[]>([]); // Store interests as an array

//     // Handle checkbox change
//     const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setInterests((prev) =>
//             prev.includes(value) ? prev.filter((interest) => interest !== value) : [...prev, value]
//         );
//     };

//     // Handle form submission
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         // Add your form validation here if needed

//         // Here you can send the data to your backend or just set the user as logged in
//         setIsLoggedIn(true); // Set logged in state to true
//         navigate("/dashboard"); // Navigate to the dashboard or home page
//     };

//     return (
//         <div className="signup-container">
//             <div className="header">
//                 <h2>Sign Up</h2>
//             </div>
//             <form className="form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="fullName">Full Name</label>
//                     <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="street">Street</label>
//                     <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="city">City</label>
//                     <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="state">State</label>
//                     <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="country">Country</label>
//                     <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="postalCode">Postal Code</label>
//                     <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="age">Age</label>
//                     <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="phoneNumber">Phone Number</label>
//                     <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
//                 </div>
//                 <div className="checkbox-group">
//                     <label>Interests:</label>
//                     <div>
//                         <label>
//                             <input type="checkbox" value="Energy" checked={interests.includes("Energy")} onChange={handleInterestChange} />
//                             Energy
//                         </label>
//                         <label>
//                             <input type="checkbox" value="Agriculture" checked={interests.includes("Agriculture")} onChange={handleInterestChange} />
//                             Agriculture
//                         </label>
//                     </div>
//                 </div>
//                 <button type="submit" className="btn">Save</button>
//             </form>
//         </div>
//     );
// };

// export default SignUpPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../../css/SignUpPage.css";

const SignUpPage: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    
    // State for form inputs
    const [fullName, setFullName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [interests, setInterests] = useState<string[]>([]); // Store interests as an array

    // Handle checkbox change
    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInterests((prev) =>
            prev.includes(value) ? prev.filter((interest) => interest !== value) : [...prev, value]
        );
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Prepare the data to send
        const userData = {
            fullName,
            street,
            city,
            state,
            country,
            postalCode,
            age,
            phoneNumber,
            interests,
        };

        try {
            // Send the data to the Django backend
            const response = await axios.post("http://localhost:8000/api/register/", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Handle success response
            console.log(response.data);
            setIsLoggedIn(true); // Set logged in state to true
            navigate("/dashboard"); // Navigate to the dashboard or home page
        } catch (error) {
            // Handle error response
            console.error("There was an error registering the user:", error);
        }
    };

    return (
        <div className="signup-container">
            <div className="header">
                <h2>Sign Up</h2>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="checkbox-group">
                    <label>Interests:</label>
                    <div>
                        <label>
                            <input type="checkbox" value="Energy" checked={interests.includes("Energy")} onChange={handleInterestChange} />
                            Energy
                        </label>
                        <label>
                            <input type="checkbox" value="Agriculture" checked={interests.includes("Agriculture")} onChange={handleInterestChange} />
                            Agriculture
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn">Save</button>
            </form>
        </div>
    );
};

export default SignUpPage;
