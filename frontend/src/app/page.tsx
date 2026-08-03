import { NavBar } from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Products } from "@/components/Products";
import { Services } from "@/components/Services";
import { Prices } from "@/components/Prices";
import { Developers } from "@/components/Developers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
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
