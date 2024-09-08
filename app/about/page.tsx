"use client";
import React, { useState } from "react";

export default function AboutPage() {
    const [activeScreen, setActiveScreen] = useState("connection");

    const renderContent = () => {
        switch (activeScreen) {
            case "connection":
                return <div className="p-4">LSN is the first dedicated platform specifically designed for sharing and promoting every event made by a student for students across the city.</div>;
            case "collaboration":
                return <div className="p-4">LSN is a hub to advertise your skills or to offer opportunities to boost experience and success across all societies</div>;
            case "careers":
                return <div className="p-4">LSN allows companies to reach people with known preferences, ease the connection and provide resources for improving CV's, interview skills and preparedness</div>;
            default:
                return <div className="p-3">LSN is the first dedicated platform specifically designed for sharing and promoting every event made by a student for students across the city.</div>;
        }
    };

    return (
        <main className='relative h-screen mx-auto p-8 mt-24 bg-[#696969]'>
			<h1 className="text-4xl font-bold mb-8 text-center">About</h1>

			<div className="flex flex-col items-center justify-center">
            <header className="mb-1">
                <nav className="flex space-x-1 md:space-x-36">
                    <button
                        className={`px-4 py-2 text-3xl font-bold rounded-md ${activeScreen === "connection" && 'bg-neutral-200 bg-opacity-80'
                            }`}
                        onClick={() => setActiveScreen("connection")}
                    >
                        Connection
                    </button>
                    <button
                        className={`px-4 py-2 text-3xl font-bold rounded-md ${activeScreen === "collaboration" && 'bg-neutral-200 bg-opacity-80'
                            }`}
                        onClick={() => setActiveScreen("collaboration")}
                    >
                        Collaboration
                    </button>
                    <button
                        className={`px-4 py-2 text-3xl font-bold rounded-md ${activeScreen === "careers" && 'bg-neutral-200 bg-opacity-80'
                            }`}
                        onClick={() => setActiveScreen("careers")}
                    >
                        Careers
                    </button>
                </nav>
            </header>

            <main className="text-xl p-2 w-full">
                {renderContent()}
            </main>
        </div>

		</main>

        
    );
}