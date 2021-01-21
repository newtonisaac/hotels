export interface IWeather {
    LocalObservationDateTime: Date;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    IsDayTime: boolean;
    Temperature: ITemperature;
    DestinationId: string;
}

export interface IMetric {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface IImperial {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface ITemperature {
    Metric: IMetric;
    Imperial: IImperial;
}
