import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Weather } from '../../../documents/weather.document';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WeatherDataService {
    readonly model: Model<Weather>
    
    constructor(
        @InjectModel(Weather.name) private readonly WeatherModel: Model<Weather>,
    ){
        this.model = this.WeatherModel
    }
}
