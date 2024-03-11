export interface BasketItemProps {
	item: BasketItem;
	onQuantityChange: (itemId: number, newQuantity: number) => void;
	onGiftWrapChange: (itemId: number) => void;
	onRecurringOrderChange: (itemId: number, newRecurringOrder: RecurringOrder) => void;
	onRemove: () => void;
}

export interface BasketSummaryProps {
	items: BasketItem[];
}

/* Recurring Order enum, add more for different options */
export enum RecurringOrder {
	Once="Once",
	Daily="Daily",
	Weekly="Weekly",
	Biweekly="Biweekly",
}

interface Discount {
	itemAmountForDiscount: number;
	discountAmount: number;
}

export interface BasketItem {
	imageUrl: string | undefined;
	id: number;
	name: string;
	price: number;
	quantity: number;
	giftWrap: boolean;
	recurringOrder: RecurringOrder;
	unit: string;
	discount?: Discount;
}
export type BasketItems = BasketItem[];

export interface DeliveryFormData {
	deliveryCountry: string |"",
    deliveryZipCode:  string |"",
    deliveryCity:  string |"",
    deliveryAddressLine:  string |"",
	deliveryAddressLine2?: string,
    firstName:  string |"",
    lastName:  string |"",
	phoneCode: string |"",
    phone:  string |"",
    email:  string |"",
    companyName:  string |"",
    companyVat:  string |"",
    billingAddressDifferent:  boolean |false,
    billingCountry: string |"DK",
    billingZipCode:  string |"",
    billingCity:  string |"",
    billingAddressLine:  string |""
	billingAddressLine2?: string;
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