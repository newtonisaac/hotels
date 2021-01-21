import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Destination } from '../../documents/destination.document';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DestinationDataService {
    readonly model: Model<Destination>
    
    constructor(
        @InjectModel(Destination.name) private readonly destinationModel: Model<Destination>,
    ){
        this.model = this.destinationModel
    }
}
