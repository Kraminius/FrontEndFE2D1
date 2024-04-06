//import CustomerItem from "./components/CustomerItem";
import { BasketItem } from "./types/Types";
import { useEffect, useState } from "react";
import "./styles/index.css";
import './styles/promotion.css';
import './styles/summary.css';
import './styles/summary.css';
import "./styles/delivery.css";
import './styles/basket.css'
import { Footer, Header } from "./components/FooterHeader.tsx";
import OrderSummary from "./components/summary/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";
import PromotionBox from "./components/PromotionCard.tsx";
import { FlowingContent } from "./components/flowingContent/FlowingContent.tsx";

const creatorNames = [
	"Christensen, Nicklas Thorbjørn",
	"Gørlyk, Tobias Pedersen",
	"Hansen, Jakob Lars Naur",
	"Jürs, Mikkel",
	"Rolsted, Frederik Emil",
	"Zenkert, Henrik Albert Erik",
];
interface AppProps {
	basketItems?: BasketItem[]; // Make it optional to maintain compatibility
}

// Right now we can use the AppProps interface to define the props for the App component, we use this for testing.
// Alternatively we could use jest.mock to mock the fetchBasketItems function.
function App({ basketItems: testBasketItems }: AppProps) {
	const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
	useEffect(() => {
		if (testBasketItems) {
			setBasketItems(testBasketItems);
			return;
		}
		(async () => {
			try {
				let items = await fetchBasketItems();
				setBasketItems(items);
			} catch (error) {
				console.error("Error fetching basket items: ", error);
			}
		})();
	}, []);
	return (
		<>
			<Header />
			<div id="content">
				<main className="page-components">
					<div id="flow-container">
						<FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} />
					</div>
					<OrderSummary items={basketItems} />
				</main>
				<PromotionBox basketItems={basketItems} />
			</div>
			<Footer creatorNames={creatorNames} />
		</>
	);
}




export default App;
