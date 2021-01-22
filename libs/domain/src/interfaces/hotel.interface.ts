
export interface IHotel {
    Type: string;
    ExternalHotelId: string;
    ChainCode: string;
    DupeId: string;
    Name: string;
    Rating: string;
    CityCode: string;
    Latitude: number;
    Longitude: number;
    HotelDistance: IHotelDistance;
    Address: IAddress;
    Contact: IContact;
    Amenities: string[];
    Media: IMedium[];
    Description: string;
    DestinationId: string;
    AveragePrize?: number;
}

export interface IHotelDistance {
    Distance: number;
    DistanceUnit: string;
}

export interface IAddress {
    Lines: string[];
    CityName: string;
    CountryCode: string;
    PostalCode: string;
}

export interface IContact {
    Phone: string;
    Fax: string;
}

export interface IMedium {
    Uri: string;
    Category: string;
}
