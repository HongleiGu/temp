'use client';
import React, { useState } from 'react';

export default function Register() {
    const [step, setStep] = useState(0); // Start at 0 for the email validation step
    const totalSteps = 5;

    // Email validation state
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    // Password validation state
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [fieldError, setFieldError] = useState("");

    // State for other steps
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [university, setUniversity] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [degreeCourse, setDegreeCourse] = useState("");
    const [levelOfStudy, setLevelOfStudy] = useState("");
    const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false); // State for terms agreement
    const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false); // Optional newsletter subscription

    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 11 }, (_, i) => currentYear + i);

    const nextStep = () => {
        setEmailError("");
        setPasswordError("");
        setFieldError("");

        // Email validation in step 0
        if (step === 0) {
            if (!email) {
                setEmailError("Email is required.");
                return;
            }
            // Simple regex for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError("Please enter a valid email.");
                return;
            }
        }

        // Step 1: Password validation
        if (step === 1) {
            if (!password || !confirmPassword) {
                setFieldError("All fields are required.");
                return;
            }
            if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters long.");
                return;
            }
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match.");
                return;
            }
            if (!hasAgreedToTerms) {
                setFieldError("You must agree to the terms of service to continue.");
                return;
            }
        }

        // Step 2 validation
        if (step === 2) {
            if (!name || !gender || !dob) {
                setFieldError("All fields are required.");
                return;
            }
        }

        // Step 3 validation
        if (step === 3) {
            if (!university || !graduationYear) {
                setFieldError("All fields are required.");
                return;
            }
        }

        // Step 4 validation (newly added)
        if (step === 4) {
            if (!degreeCourse || !levelOfStudy) {
                setFieldError("All fields are required.");
                return;
            }
        }

        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        setFieldError(""); // Clear errors when going back
        if (step > 0) setStep(step - 1);
    };

    const calculateProgress = () => {
        return ((step + 1) / (totalSteps + 1)) * 100; // Progress bar from step 0 to step 5
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-screen p-12 md:px-60 bg-white">
                {/* Step 0: Email input */}
                {step === 0 && (
                    <div>
                        <h2 className="text-4xl font-semibold">Let’s create your account</h2>
                        <p className="mt-4 text-gray-600">First of all, please register an email address</p>
                        <p className="mt-2 text-gray-600">We will send a confirmation email to the address to begin your onboarding</p>

                        {/* Email input */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        {emailError && <p className="text-red-500 mt-2">{emailError}</p>} {/* Email error */}

                        <div className="text-right">
                            <button
                                onClick={nextStep}
                                className="mt-3 p-3 bg-black text-white rounded-lg"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 1: Password input */}
                {step === 1 && (
                    <div>
                        <h2 className="text-4xl font-semibold">Let’s create your account</h2>
                        <p className="mt-4 text-gray-600">Please set a strong password for your account</p>

                        {/* Password input */}
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />

                        {/* Confirm Password input */}
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>} {/* Password error */}

                        {/* Show password toggle */}
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="mr-2"
                                />
                                Show password
                            </label>
                        </div>

                        {/* Terms of Service (mandatory) */}
                        <div className="mt-4">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="mr-2 mt-1"
                                    checked={hasAgreedToTerms}
                                    onChange={() => setHasAgreedToTerms(!hasAgreedToTerms)} // Toggle terms agreement
                                />
                                <span className="text-gray-700">
                                    I agree to the{" "}
                                    <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        terms of service
                                    </a>{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        {/* Newsletter Subscription (optional) */}
                        <div className="mt-2">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    className="mr-2 mt-1"
                                    checked={isNewsletterSubscribed}
                                    onChange={() => setIsNewsletterSubscribed(!isNewsletterSubscribed)} // Toggle newsletter subscription
                                />
                                <span className="text-gray-700">
                                    Subscribe to our newsletter and communications <span className="text-gray-500">(we don’t spam)</span>
                                </span>
                            </label>
                        </div>

                        {/* Continue button */}
                        {fieldError && <p className="text-red-500 mt-2">{fieldError}</p>}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="p-3 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="p-3 rounded-lg text-white bg-black"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}


                {step === 2 && (
                    <div>
                        <h2 className="text-4xl font-semibold">Tell us a bit about yourself!</h2>
                        <p className="mt-4 text-gray-600">Let’s get started</p>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Prefer not to say</option>
                        </select>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        {fieldError && <p className="text-red-500 mt-2">{fieldError}</p>} {/* General error */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="p-3 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="p-3 bg-black text-white rounded-lg"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-4xl font-semibold">Where are you studying?</h2>
                        <p className="mt-4 text-gray-600">And other questions</p>
                        <input
                            type="text"
                            placeholder="University"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        <select
                            value={graduationYear}
                            onChange={(e) => setGraduationYear(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Graduation Year</option>
                            {graduationYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        {fieldError && <p className="text-red-500 mt-2">{fieldError}</p>} {/* General error */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="p-3 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="p-3 bg-black text-white rounded-lg"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2 className="text-4xl font-semibold">What are you studying?</h2>
                        <p className="mt-4 text-gray-600">Underwater basket weaving is allowed</p>
                        <input
                            type="text"
                            placeholder="Degree Course"
                            value={degreeCourse}
                            onChange={(e) => setDegreeCourse(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        />
                        <select
                            value={levelOfStudy}
                            onChange={(e) => setLevelOfStudy(e.target.value)}
                            className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Level of Study</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="postgraduate">Postgraduate</option>
                        </select>
                        {fieldError && <p className="text-red-500 mt-2">{fieldError}</p>} {/* General error */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="p-3 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="p-3 bg-black text-white rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {/* Thank You Page - Step 5 */}
                {step === 5 && (
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold">Thank you for registering!</h2>
                        <p className="mt-4 text-gray-600">We’ve received your information and will be in touch soon.</p>
                    </div>
                )}

                {/* Progress Bar */}
                {step !== totalSteps && (
                    <div className="relative mt-3">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black">
                                    Step {step + 1} of {totalSteps + 1}
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div
                                style={{ width: `${calculateProgress()}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
