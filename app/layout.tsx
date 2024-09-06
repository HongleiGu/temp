import type { Metadata } from "next";
import { inria } from '@/app/fonts';
import "./globals.css";
import Header from "./components/header";

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
				<Header />
				{children}
			</body>
		</html>
	);
}
