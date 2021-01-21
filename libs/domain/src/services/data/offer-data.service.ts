import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Offer } from '../../../documents/offer.document';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OfferDataService {
    readonly model: Model<Offer>
    
    constructor(
        @InjectModel(Offer.name) private readonly OfferModel: Model<Offer>,
    ){
        this.model = this.OfferModel
    }
}
