import { setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Products } from "@/components/Products";
import { Services } from "@/components/Services";
import { Prices } from "@/components/Prices";
import { Developers } from "@/components/Developers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<NavBar />
			<main>
				<Header />
				<Products />
				<Services />
				<Prices />
				<Developers />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
