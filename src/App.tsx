//import CustomerItem from "./components/CustomerItem";
import { BasketItem } from "./types/Types";
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
import { Footer, Header } from "./components/FooterHeader.tsx";
import OrderSummary from "./components/summary/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";
import PromotionBox from "./components/PromotionCard.tsx";
import { FlowingContent } from "./components/flowingContent/FlowingContent.tsx";
import { ProgressBar } from "./components/ProgressBar.tsx";
import { ContentFlow } from "./components/flowingContent/FlowingContent";
import {useBasketDispatchContext} from "./context/BasketContext.tsx";

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
  const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useBasketDispatchContext();

  useEffect(() => {

    if (testBasketItems) {
      dispatch({ type: 'SET_ITEMS', payload: testBasketItems });
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        const items = await fetchBasketItems();
        dispatch({ type: 'SET_ITEMS', payload: items });
        setError("");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching basket items: ", error);
        setError("Error fetching your items, please try reloading the page...");
        setIsLoading(false);
      }
    })();
  }, [testBasketItems]);

  return (
    <>
      <Header />
      <ProgressBar currentFlow={contentFlow} />
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
                <div className="loading-text"> Loading your basket...</div>
                <div className="loading-wheel"></div>
              </>
            )}
            <FlowingContent
              contentFlow={contentFlow}
              setContentFlow={setContentFlow}
            />
          </div>
          <OrderSummary />
        </main>
        <PromotionBox basketItems={basketItems} />
      </div>
      <Footer creatorNames={creatorNames} />
    </>
  );
}

export default App;
