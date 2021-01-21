
export interface IOffer {
    ExternalId: string;
    RateCode: string;
    Room: IRoom;
    Guests: IGuests;
    Price: IPrice;
    RateFamilyEstimated: IRateFamilyEstimated;
}

export interface IDescription {
    Lang: string;
    Text: string;
}

export interface ITypeEstimated {
    Category: string;
    Beds: number;
    BedType: string;
}

export interface IRoom {
    Type: string;
    TypeEstimated: ITypeEstimated;
    Description: IDescription;
}

export interface IGuests {
    Adults: number;
}

export interface IAverage {
    Base: string;
}

export interface IChange {
    StartDate: string;
    EndDate: string;
    Base: string;
}

export interface IVariations {
    Average: IAverage;
    Changes: IChange[];
}

export interface IPrice {
    Currency: string;
    Base: string;
    Total: string;
    Variations: IVariations;
}

export interface IRateFamilyEstimated {
    Code: string;
    Type: string;
}
