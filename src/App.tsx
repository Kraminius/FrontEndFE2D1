//import CustomerItem from "./components/CustomerItem";
import { useEffect, useState } from "react";
import "./styles/index.css";
import "./styles/promotion.css";
import "./styles/summary.css";
import "./styles/summary.css";
import "./styles/delivery.css";
import "./styles/basket.css";
import "./styles/payment.css";
import "./styles/error.css";
import "./styles/loading.css";
import "./styles/receipt.css";
import { Footer, Header } from "./components/FooterHeader.tsx";
import OrderSummary from "./components/summary/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";
import PromotionBox from "./components/PromotionCard.tsx";
import { ProgressBar } from "./components/ProgressBar.tsx";
import { Outlet } from "react-router-dom";
import { useBasketDispatchContext } from "./context/BasketContext.tsx";
import { isLocallyStored } from "./context/LocalStorage.ts";
import { BasketItem } from "./types/Types.ts";

const creatorNames = [
	"Christensen, Nicklas Thorbjørn",
	"Gørlyk, Tobias Pedersen",
	"Hansen, Jakob Lars Naur",
	"Jürs, Mikkel",
	"Rolsted, Frederik Emil",
	"Zenkert, Henrik Albert Erik",
];

interface AppProps {
	testBasketItems?: BasketItem[];
}

// Right now we can use the AppProps interface to define the props for the App component, we use this for testing.
// Alternatively we could use jest.mock to mock the fetchBasketItems function.
function App({ testBasketItems }: AppProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const basketDispatch = useBasketDispatchContext();

	useEffect(() => {
		if (testBasketItems) {
			basketDispatch({ type: "SET_ITEMS", payload: testBasketItems });
			setIsLoading(false);
		}
		if (isLocallyStored()) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
			(async () => {
				try {
					const items = await fetchBasketItems();
					basketDispatch({ type: "SET_ITEMS", payload: items });
					setError("");
				} catch (error) {
					console.error("Error fetching basket items: ", error);
					setError(
						"Error fetching your items, please try reloading the page...",
					);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [basketDispatch, testBasketItems]);

  return (
    <>
      <Header />
      <ProgressBar />
      <div id="content">
        {error && (
          <div className="error">
            <div>{error}</div>
            <button
              className="refresh-button"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        )}
        <main className="page-components">
          <div id="flow-container">
            {isLoading && (
              <>
                <div className="loading-text">Loading your basket...</div>
                <div className="loading-wheel"></div>
              </>
            )}
            <Outlet />
          </div>
          <OrderSummary />
        </main>
        <PromotionBox />
      </div>
      <Footer creatorNames={creatorNames} />
    </>
  );
}

export default App;
