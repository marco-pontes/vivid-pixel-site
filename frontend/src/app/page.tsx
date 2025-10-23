import { NavBar } from "@/components/NavBar";
import Header from "@/components/Header";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Prices } from "@/components/Prices";
import { Developers } from "@/components/Developers";
import { Footer } from "@/components/Footer";
import { Modal } from "@/components/Popup";
import { Contact } from "@/components/Contact";

export default function Home() {
	return (
		<>
			<NavBar></NavBar>
			<Header></Header>
			<main>
				<About></About>
				<Features></Features>
				<Prices></Prices>
				<Developers></Developers>
				<Contact></Contact>
			</main>
			<Footer></Footer>
			<Modal></Modal>
		</>
	);
}
