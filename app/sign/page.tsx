import React from 'react';

export default function SignPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col md:flex-row items-center rounded-md w-full max-w-5xl">
                {/* Left Section */}
                <div className="flex flex-col items-center space-y-4 p-12">
                    <h2 className="text-3xl font-medium text-center pb-20">Already got an account?</h2>
                    <a
                        href="/login"
                        className="text-xl font-semibold text-black underline hover:text-gray-700"
                    >
                        Sign in &rarr;
                    </a>
                </div>

                {/* Divider */}
                <div className="w-2/3 h-0.5 md:w-0.5 md:h-96 bg-black mx-20"></div>

                {/* Right Section */}
                <div className="flex flex-col items-center space-y-4 p-12">
                    <h2 className="text-3xl font-medium text-center pb-20">New to LSN?</h2>
                    <a
                        href="/register"
                        className="text-xl font-semibold text-black underline hover:text-gray-700"
                    >
                        Join us &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
}