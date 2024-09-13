import type { Metadata } from "next";
import { inria } from '@/app/fonts';
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { SessionProvider } from "next-auth/react";


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
				<SessionProvider>
					<Header />
					{children}
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
