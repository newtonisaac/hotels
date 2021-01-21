
export interface HotelDistance {
    distance: number;
    distanceUnit: string;
}

export interface Address {
    lines: string[];
    cityName: string;
    countryCode: string;
    postalCode: string;
}

export interface Contact {
    phone: string;
    fax: string;
}

export interface Medium {
    uri: string;
    category: string;
}

export interface Description {
    lang: string;
    text: string;
}

export interface Hotel {
    type: string;
    hotelId: string;
    chainCode: string;
    dupeId: string;
    name: string;
    rating: string;
    cityCode: string;
    latitude: number;
    longitude: number;
    hotelDistance: HotelDistance;
    address: Address;
    contact: Contact;
    amenities: string[];
    media: Medium[];
    description: Description;
}

export interface TypeEstimated {
    category: string;
    beds: number;
    bedType: string;
}

export interface Room {
    type: string;
    typeEstimated: TypeEstimated;
    description: Description;
}

export interface Guests {
    adults: number;
}

export interface Average {
    base: string;
}

export interface Change {
    startDate: string;
    endDate: string;
    base: string;
}

export interface Variations {
    average: Average;
    changes: Change[];
}

export interface Price {
    currency: string;
    base: string;
    total: string;
    variations: Variations;
}

export interface RateFamilyEstimated {
    code: string;
    type: string;
}

export interface Offer {
    id: string;
    rateCode: string;
    room: Room;
    guests: Guests;
    price: Price;
    rateFamilyEstimated: RateFamilyEstimated;
}

export interface AmadeusHotelOffer {
    type: string;
    hotel: Hotel;
    available: boolean;
    offers: Offer[];
    self: string;
}

export interface Links {
    next: string;
}

export interface Meta {
    links: Links;
}
