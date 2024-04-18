export interface BasketItemProps {
	item: BasketItem;
	onQuantityChange: (itemId: string, newQuantity: number) => void;
	onGiftWrapChange: (itemId: string) => void;
	onRecurringOrderChange: (itemId: string, newRecurringOrder: RecurringOrder) => void;
	onRemove: () => void;
}

export interface BasketSummaryProps {
	items: BasketItem[];
}

/* Recurring Order enum, add more for different options */
export enum RecurringOrder {
	Once = "Once",
	Daily = "Daily",
	Weekly = "Weekly",
	Biweekly = "Biweekly",
}


export interface BasketItem {
	imageUrl?: string;
	id: string;
	name: string;
	price: number;
	quantity: number;
	currency: string;
	giftWrap: boolean;
	rebateQuantity: number;
	rebatePercent: number;
	upsellProductId: string | null;
	recurringOrder: RecurringOrder;
}
export type BasketItems = BasketItem[];

export interface DeliveryFormData {
	deliveryCountry: string;
	deliveryZipCode: string;
	deliveryCity: string;
	deliveryAddressLine: string;
	deliveryAddressLine2: string;
	firstName: string;
	lastName: string;
	phoneCode: string;
	phone: string;
	email: string;
	companyName: string;
	companyVat: string;
	billingAddressDifferent: boolean | false;
	billingCountry: string | "DK";
	billingZipCode: string | "";
	billingCity: string | "";
	billingAddressLine: string;
	billingAddressLine2: string;
	agreeToTerms: boolean;
	agreeToMarketing: boolean;
	deliveryMessage: string;
}


export interface PostalData {
	href: string;
	nr: string;
	navn: string;
	stormodtageradresser: any;
	bbox: number[];
	visueltcenter: number[];
	kommuner: {
		href: string;
		kode: string;
		navn: string;
	}[];
	ændret: string;
	geo_ændret: string;
	geo_version: number;
	dagi_id: string;
}

export enum ContentFlow {
	Basket,
	Delivery,
	Payment,
	Receipt,
}