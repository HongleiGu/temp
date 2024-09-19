'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    gender: string;
    dob: string;
    university: string;
    graduationYear: string;
    degreeCourse: string;
    levelOfStudy: string;
    hasAgreedToTerms: boolean;
    isNewsletterSubscribed: boolean;
}

export default function Register() {
    const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm<FormData>({ defaultValues: { showPassword: false } });
    const [step, setStep] = useState(0);
    const totalSteps = 5;

    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 11 }, (_, i) => currentYear + i);

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const calculateProgress = () => {
        return ((step + 1) / (totalSteps + 1)) * 100;
    };

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                console.log('User successfully created:', data);
                // router.push('/login');
                nextStep();
            } else {
                console.error('Error creating user:', result.error);
            }
        } catch (error) {
            console.error('Error during user creation:', error);
        }
    };

    // Step 0: Email input
    const Step0 = () => (
        <div>
            <h2 className="text-4xl font-semibold">Let’s create your account</h2>
            <p className="mt-4 text-gray-300">First of all, please register an email address</p>
            <p className="mt-2 text-gray-300">We will send a confirmation email to the address to begin your onboarding</p>

            <input
                type="email"
                placeholder="Email"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('email', { required: 'Email is required.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email.' } })}
            />
            {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}

            <div className="text-right">
                <button onClick={handleSubmit(nextStep)} className="mt-3 p-3 bg-black text-white rounded-lg">
                    Continue
                </button>
            </div>
        </div>
    );

    // Step 1: Password input
    const Step1 = () => {
        const showPassword = watch('showPassword');

        return (
            <div>
                <h2 className="text-4xl font-semibold">Let’s create your account</h2>
                <p className="mt-4 text-gray-600">Please set a strong password for your account</p>

                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full mt-4 p-3 border text-black border-gray-300 rounded-lg"
                    //   {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })}
                    {...register('password')}
                />

                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full mt-4 p-3 border text-black border-gray-300 rounded-lg"
                    {...register('confirmPassword', {
                        // required: 'Confirm password is required.',
                        // validate: (value) => value === getValues('password') || 'Passwords do not match.',
                    })}
                />
                {/* {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>} */}
                {/* {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword.message}</p>} */}

                {/* Show password toggle */}
                <div className="mt-2">
                    <label className="flex items-center">
                        <input type="checkbox" {...register('showPassword')} className="mr-2" />
                        Show password
                    </label>
                </div>

                {/* Terms of Service (mandatory) */}
                <div className="mt-4">
                    <label className="flex items-start">
                        <input type="checkbox" className="mr-2 mt-1" {...register('hasAgreedToTerms', { required: 'You must agree to the terms of service to continue.' })} />
                        <span className="text-gray-700">
                            I agree to the{' '}
                            <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                terms of service
                            </a>{' '}
                            <span className="text-red-500">*</span>
                        </span>
                    </label>
                </div>
                {errors.hasAgreedToTerms && <p className="text-red-500 mt-2">{errors.hasAgreedToTerms.message}</p>}

                {/* Newsletter Subscription (optional) */}
                <div className="mt-2">
                    <label className="flex items-start">
                        <input type="checkbox" className="mr-2 mt-1" {...register('isNewsletterSubscribed')} />
                        <span className="text-gray-700">Subscribe to our newsletter and communications</span>
                    </label>
                </div>

                {/* Continue button */}
                <div className="flex justify-between mt-6">
                    <button onClick={prevStep} className="p-3 bg-gray-300 text-black rounded-lg">
                        Back
                    </button>
                    <button onClick={handleSubmit(nextStep)} className="p-3 rounded-lg text-white bg-black">
                        Continue
                    </button>
                </div>
            </div>
        );
    };

    // Step 2: User Information
    const Step2 = () => (
        <div>
            <h2 className="text-4xl font-semibold">Tell us a bit about yourself!</h2>
            <p className="mt-4 text-gray-600">Let’s get started</p>

            <input
                type="text"
                placeholder="Full Name"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('name', { required: 'Full Name is required.' })}
            />
            <select
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('gender', { required: 'Gender is required.' })}
            >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Prefer not to say</option>
            </select>
            <input
                type="date"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('dob', { required: 'Date of Birth is required.' })}
            />
            {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
            {errors.gender && <p className="text-red-500 mt-2">{errors.gender.message}</p>}
            {errors.dob && <p className="text-red-500 mt-2">{errors.dob.message}</p>}

            <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="p-3 bg-gray-300 text-black rounded-lg">
                    Back
                </button>
                <button onClick={handleSubmit(nextStep)} className="p-3 bg-black text-white rounded-lg">
                    Continue
                </button>
            </div>
        </div>
    );

    // Step 3: University and Graduation
    const Step3 = () => (
        <div>
            <h2 className="text-4xl font-semibold">Where are you studying?</h2>
            <p className="mt-4 text-gray-600">And other questions</p>

            <input
                type="text"
                placeholder="University"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('university', { required: 'University is required.' })}
            />
            <select
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('graduationYear', { required: 'Graduation Year is required.' })}
            >
                <option value="">Select Graduation Year</option>
                {graduationYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            {errors.university && <p className="text-red-500 mt-2">{errors.university.message}</p>}
            {errors.graduationYear && <p className="text-red-500 mt-2">{errors.graduationYear.message}</p>}

            <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="p-3 bg-gray-300 text-black rounded-lg">
                    Back
                </button>
                <button onClick={handleSubmit(nextStep)} className="p-3 bg-black text-white rounded-lg">
                    Continue
                </button>
            </div>
        </div>
    );

    // Step 4: Degree and Study Level
    const Step4 = () => (
        <div>
            <h2 className="text-4xl font-semibold">What are you studying?</h2>
            <p className="mt-4 text-gray-600">Underwater basket weaving is allowed</p>

            <input
                type="text"
                placeholder="Degree Course"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('degreeCourse', { required: 'Degree Course is required.' })}
            />
            <select
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                {...register('levelOfStudy', { required: 'Level of Study is required.' })}
            >
                <option value="">Level of Study</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
            </select>
            {errors.degreeCourse && <p className="text-red-500 mt-2">{errors.degreeCourse.message}</p>}
            {errors.levelOfStudy && <p className="text-red-500 mt-2">{errors.levelOfStudy.message}</p>}

            <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="p-3 bg-gray-300 text-black rounded-lg">
                    Back
                </button>
                <button onClick={handleSubmit(onSubmit)} className="p-3 bg-black text-white rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157]">
            <div className="w-screen p-12 md:px-60">
                {step === 0 && <Step0 />}
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}

                {step === totalSteps && (
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
