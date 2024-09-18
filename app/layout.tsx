import type { Metadata } from "next";
import { inria } from '@/app/fonts';
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SessionProviderWrapper from "./components/session-provider-wrapper";


export const metadata: Metadata = {
	title: "London Student Network",
	description: "For the students, by the students",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inria.className} antialiased`} >
				<SessionProviderWrapper>
					<Header />
					<div className="overflow-hidden">
						{children}
					</div>
					<Footer />
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
