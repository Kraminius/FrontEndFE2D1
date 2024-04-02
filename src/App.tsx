//import CustomerItem from "./components/CustomerItem";
import { BasketItem, DeliveryFormData, RecurringOrder } from "./types/Types";
import { useEffect, useState } from "react";
import "./Styles/index.css";
import "./Styles/phone_index.css";
import Footer from "./components/Footer";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import PromotionCard from "./components/PromotionCard.tsx";
import Delivery from "./components/Delivery.tsx";
import OrderSummary from "./components/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";

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

	// Fetching the initial items, if testBasketItems is provided, use that instead (for testing purposes).
	useEffect(() => {
		if (testBasketItems) {
			setBasketItems(testBasketItems);
			return;
		}
		(async () => {
			try {
				const items = await fetchBasketItems();
				setBasketItems(items);
			} catch (error) {
				console.error("Error fetching basket items: ", error);

				// show error message to user

			}
		})();
	}, []);

	const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(true);

	const handleQuantityChange = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) {
			return;
		}
		const updatedItems = basketItems.map((item) => {
			if (item.id === itemId) {
				return { ...item, quantity: newQuantity };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleGiftWrapChange = (itemId: string) => {
		const updatedItems = basketItems.map((item) => {
			if (item.id === itemId) {
				return { ...item, giftWrap: !item.giftWrap };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleRecurringOrderChange = (
		itemId: string,
		newRecurringOrder: RecurringOrder
	) => {
		if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
			const updatedBasketItems = basketItems.map((item) =>
				item.id === itemId
					? { ...item, recurringOrder: newRecurringOrder as RecurringOrder }
					: item
			);
			setBasketItems(updatedBasketItems);
		} else {
			console.error("Invalid recurring order type.");
		}
	};

	const handleRemove = (itemId: string) => {
		setBasketItems(basketItems.filter((item) => item.id !== itemId));
	};

	const isMobileScreenSize = () => {
		return window.innerWidth <= window.innerHeight;
	};

	const [contentFlow, setContentFlow] = useState(0);

	function handleNextClick() {
		setContentFlow((prevContentFlow) => {
			// If the current value is greater than 2, reset to 0 otherwise, increment (Change 2 if you add more pages Guys)
			return prevContentFlow > 2 ? 0 : prevContentFlow + 1;
		});
		window.scrollTo(0, 0);
	}

	function renderContent() {
		switch (contentFlow) {
			case 0: //Basket
				return basketItems.length > 0 ? (
					basketItems.map((item) => (
						<CustomerItemCard
							key={item.id}
							item={item}
							onQuantityChange={handleQuantityChange}
							onGiftWrapChange={handleGiftWrapChange}
							onRecurringOrderChange={handleRecurringOrderChange}
							onRemove={() => handleRemove(item.id)}
						/>
					))
				) : (
					<div className="empty-basket-message">
						Your basket is empty. <a href="/browse">Browse more items</a>
					</div>
				);
			case 1: //Delivery Information
				return (
					<DeliveryComponent isDeliveryFormValid={isDeliveryFormValid} setIsDeliveryFormValid={setIsDeliveryFormValid} />
				);
			case 2: //Payment
				return <div>idk payment I suppose :b</div>;
			default: //Last Page - Receipt
				return <div>Receipt page</div>;
		}
	}

	if (isMobileScreenSize()) {
		//Phone View
		return (
			<div>
				<div className="phone-header"> Shopping Basket</div>
				<div className="phone-page-components">
					<div className="phone-content-container">{renderContent()}</div>
					<PromoBox basketItems={basketItems} />
					<div className="phone-summary-container">
						<OrderSummary items={basketItems} />
					</div>
					<ContinueButton handleNextClick={handleNextClick} isDeliveryFormValid={isDeliveryFormValid} />
				</div>
				<Footer creatorNames={creatorNames} />
			</div>
		);
	} else {
		//Monitor View
		return (
			<div>
				<div className="header">
					<h1>Shopping Basket</h1>
				</div>
				<div className="page_components">
					<div className="page_and_summary_container">
						<div className="content-container">{renderContent()}</div>
						<div className="user-info-container">
							<div className="summary-container">
								<OrderSummary items={basketItems} />
							</div>
						</div>
					</div>
					<ContinueButton handleNextClick={handleNextClick} isDeliveryFormValid={isDeliveryFormValid} />
					<PromoBox basketItems={basketItems} />
				</div>
				<Footer creatorNames={creatorNames} />
			</div>
		);
	}
}

interface PromoBoxProps {
	basketItems: BasketItem[];

}
const PromoBox = ({ basketItems }: PromoBoxProps) => (

	<div className="promotion-box">
		<div className="title-card">See Also</div>
		<div className="promotion-container">
			{basketItems.map((item) => (
				<PromotionCard key={item.id} item={item} />
			))}
		</div>
	</div>
)
interface ContinueButtonProps {
	handleNextClick: () => void;
	isDeliveryFormValid: boolean;
}
const ContinueButton = ({ handleNextClick, isDeliveryFormValid }: ContinueButtonProps) => (
	<div className="continue">
		<button
			className="continue__button"
			onClick={handleNextClick}
			disabled={!isDeliveryFormValid}
		>
			Continue
		</button>
	</div>
)


interface DeliveryComponentProps {
	isDeliveryFormValid: boolean;
	setIsDeliveryFormValid: (isValid: boolean) => void;
}
function DeliveryComponent({ isDeliveryFormValid, setIsDeliveryFormValid }: DeliveryComponentProps) {
	const [formData, setFormData] = useState<DeliveryFormData>({
		deliveryCountry: "DK",
		deliveryZipCode: "",
		deliveryCity: "",
		deliveryAddressLine: "",
		deliveryAddressLine2: "",
		firstName: "",
		lastName: "",
		phoneCode: "+45",
		phone: "",
		email: "",
		companyName: "",
		companyVat: "",
		billingAddressDifferent: false,
		billingCountry: "DK",
		billingZipCode: "",
		billingCity: "",
		billingAddressLine: "",
		billingAddressLine2: "",
	});
	const [isTOSAccepted, setIsTOSAccepted] = useState(false);

	setIsDeliveryFormValid(validateForm(formData) && isTOSAccepted);
	return (
		<Delivery>
			<Delivery.Form setFormData={setFormData} formData={formData} />
			<Delivery.Separator />
			<Delivery.TermsOfService isTOSAccepted={isTOSAccepted} setIsTOSAccepted={setIsTOSAccepted} />
		</Delivery>
	);
}

function validateForm(formData: DeliveryFormData) {
	const isNotEmpty = (value: string) => value.trim() !== "";
	const isValidEmail = (email: string): boolean => {
		const regex = /^[^\s@]+@(?![.-])[^\s@]+\.[^\s@]+(?<!\.)$/;
		return regex.test(email);
	};

	if (!isNotEmpty(formData.deliveryCountry)) return false;
	if (formData.deliveryZipCode.length !== 4) return false;
	if (!isNotEmpty(formData.deliveryCity)) return false;
	if (!isNotEmpty(formData.deliveryAddressLine)) return false;
	if (!isNotEmpty(formData.firstName)) return false;
	if (!isNotEmpty(formData.lastName)) return false;
	if (formData.phone.length !== 8) return false;
	if (!isValidEmail(formData.email)) return false;

	if (formData.billingAddressDifferent) {
		if (formData.billingZipCode.length !== 4) return false;
		if (!isNotEmpty(formData.billingCountry)) return false;
		if (!isNotEmpty(formData.billingCity)) return false;
		if (!isNotEmpty(formData.billingAddressLine)) return false;
	}

	return true;
}
export default App;
