import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Dashboard from "./Dashboard"; // Importing Dashboard

function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    prevention: "",
    lifestyle: "",
    email: "",
    password: "",
    rePassword: "",
    terms: false,
  });

  const [isSignedUp, setIsSignedUp] = useState(false); // Track if signup is complete
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      if (formData.password !== formData.rePassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Account Created Successfully!");
      setIsSignedUp(true); // Set the signup completion state
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // If the user has signed up, show the Dashboard instead
  if (isSignedUp) {
    return <Dashboard />;
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3>Let's start with your name</h3>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3>Tell us about yourself</h3>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3>Your physical details</h3>
            <div className="form-group">
              <label htmlFor="weight">Weight (in lbs):</label>
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height:</label>
              <div className="height-inputs">
                <input
                  type="number"
                  id="heightFeet"
                  name="heightFeet"
                  placeholder="ft"
                  value={formData.heightFeet}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  id="heightInches"
                  name="heightInches"
                  placeholder="in"
                  value={formData.heightInches}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3>Your health goals</h3>
            <div className="form-group">
              <label htmlFor="prevention">What are you trying to prevent?</label>
              <select id="prevention" name="prevention" value={formData.prevention} onChange={handleChange} required>
                <option value="">Select an option</option>
                <option value="diabetes">Diabetes</option>
                <option value="heartDisease">Heart Disease</option>
                <option value="obesity">Obesity</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lifestyle">Describe your lifestyle:</label>
              <textarea
                id="lifestyle"
                name="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                maxLength={30}
                placeholder="Maximum 30 words"
                required
              ></textarea>
              <small>{30 - formData.lifestyle.split(" ").length} words remaining</small>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h3>Create your account</h3>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rePassword">Re-enter Password:</label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} required />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="SignUp">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 5) * 100}%` }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        <div className="navigation-buttons">
          {step > 1 && (
            <button type="button" onClick={handleBack} className="back-button">
              ← Back
            </button>
          )}
          <button type="submit" className="next-button">{step === 5 ? "Get Started" : "Next →"}</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
