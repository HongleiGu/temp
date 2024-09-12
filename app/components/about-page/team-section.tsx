export default function TeamSection() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col justify-center bg-center bg-cover bg-no-repeat pt-60 md:pt-32"
        >
            {/* Overlay to make text readable */}
            <div className="absolute inset-0"></div>

            {/* Content */}
            <div className="relative z-10 text-left text-white max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-6 tracking-wider">Meet the Team</h1>
                <hr className="border-white border-2 w-40 my-8" />

                {/* Team Members */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/josh-robinson.png" alt="Josh Robinson" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Josh Robinson</h2>
                        <p className="text-xl text-gray-300 pb-10">Founder and CEO</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/mridula-jethwani.png" alt="Mridula Jethwani" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Mridula Jethwani</h2>
                        <p className="text-xl text-gray-300 pb-10">Chief Operating Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/zain-ahmad.png" alt="Zain Ahmad" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Zain Ahmad</h2>
                        <p className="text-xl text-gray-300 pb-10">Head of Strategy</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/patrick-schnecker.png" alt="Patrick Schnecker" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Patrick Schnecker</h2>
                        <p className="text-xl text-gray-300 pb-10">Head of Outreach</p>
                    </div>
                    
                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/manon-martin.png" alt="Manon Martin" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Manon Martin</h2>
                        <p className="text-xl text-gray-300 pb-10">Head of Events</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/nela-deniova.png" alt="Nela Duniova" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Nela Duniova</h2>
                        <p className="text-xl text-gray-300 pb-10">Events Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/daryus-marchant.png" alt="Daryus Marchant" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Daryus Marchant</h2>
                        <p className="text-xl text-gray-300 pb-10">Events Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/james-garside.png" alt="James Garside" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">James Garside</h2>
                        <p className="text-xl text-gray-300 pb-10">Product Designer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/julie-beaulieu.png" alt="Julie Beaulieu" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Julie Beaulieu</h2>
                        <p className="text-xl text-gray-300 pb-10">Head of Marketing</p>
                    </div>
                    
                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/ollie-callon-hine.png" alt="Ollie Callon Hine" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Ollie Callon Hine</h2>
                        <p className="text-xl text-gray-300 pb-10">Multimedia Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/seddig-mohamed.png" alt="Seddig Mohamed" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Seddig Mohamed</h2>
                        <p className="text-xl text-gray-300 pb-10">Multimedia Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/anish-kochhar.jpg" alt="Anish Kochhar" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Anish Kochhar</h2>
                        <p className="text-xl text-gray-300 pb-10">Tech Officer</p>
                    </div>

                    <div className="bg-black bg-opacity-50 p-2 text-center">
                        <img src="/images/about/alan-jiang.jpg" alt="Alan Jiang" className="w-48 h-60 object-cover mx-auto my-4" />
                        <h2 className="text-2xl tracking-wider mb-2 underline">Alan Jiang</h2>
                        <p className="text-xl text-gray-300 pb-10">Website Developer</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
