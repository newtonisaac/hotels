import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Hotel } from '../../documents/hotel.document';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelDataService {
    readonly model: Model<Hotel>
    
    constructor(
        @InjectModel(Hotel.name) private readonly HotelModel: Model<Hotel>,
    ){
        this.model = this.HotelModel
    }
}
