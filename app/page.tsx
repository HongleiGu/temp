import PartnersSection from "./components/homepage/partners-section";
import HomePageTopSection from "./components/homepage/top-section";

export default function Home() {
	return (
		<main className="relative bg-cover bg-center bg-fixed bg-no-repeat h-screen overflow-y-auto" style={{ backgroundImage: "url('/images/tower-bridge-1.jpeg')" }} >
			{/* <section className="bg-black bg-opacity-50"> */}
				<HomePageTopSection />
				<PartnersSection />
			{/* </section> */}
		</main>
	);
}


