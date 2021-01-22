
export interface IOffer {
    ExternalId: string;
    RateCode: string;
    Room: IRoom;
    Guests: IGuests;
    Price: IPrice;
    DestinationId: string;
    HotelId: string;
}

export interface IRoom {
    Type: string;
    Description: string;
}

export interface IGuests {
    Adults: number;
}

export interface IChange {
    StartDate: string;
    EndDate: string;
    Base: string;
}

export interface IPrice {
    Currency: string;
    Base: string;
    Total: string;
}

