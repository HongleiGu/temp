import Link from "next/link";

export default function HomePageTopSection() {
    return (
        <section className="relative bg-cover bg-center bg-no-repeat h-screen"
            style={{ backgroundImage: "url('/images/tower-bridge-1.jpeg')" }}>
            <div className="flex flex-col h-full bg-black bg-opacity-50 items-center justify-center">
                <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold">London Student Network</h1>

                <div className="w-auto flex flex-row p-10 space-x-20 " >

                    <p className="font-bold text-lg md:text-xl">Connecting 500, 000 students</p>

                    <Link href="/sign" className="flex items-center space-x-2 group">
                        <div>
                            <span className="relative text-lg font-medium flex items-center space-x-2">
                                Join Us
                                <img
                                    src="/icons/arrow-right.svg"
                                    alt="next"
                                    className="h-4 ml-2 backdrop:transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                                />
                            </span>
                            <span className="block w-full h-px bg-white mt-1"></span>
                        </div>
                    </Link>
                </div>

            </div>
        </section>

    )
}