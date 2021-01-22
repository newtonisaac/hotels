import { Injectable, Logger } from '@nestjs/common';
import { DestinationDataService } from '@tui/domain/services/data/destination-data.service';
import { HotelDataService } from '@tui/domain/services/data/hotel-data.service';
import { OfferDataService } from '@tui/domain/services/data/offer-data.service';
import { AmadeusIntegrationService } from '@tui/integration/amadeus/amadeus-integration.service';
import { AmadeusHotelOffer, AmadeusOffer } from '@tui/integration/amadeus/interfaces/hotel-offer.interface';
import { Hotel } from '@tui/domain/documents/hotel.document';
import { IMedium, IHotel } from '@tui/domain/interfaces/hotel.interface';
import { Offer } from '@tui/domain/documents/offer.document';
import { IOffer } from '@tui/domain/interfaces/offer.interface';
import { ObjectId } from 'mongoose/lib/types'

@Injectable()
export class HotelSeederService {
  constructor(
      private destinationDataService: DestinationDataService,
      private amadeusIntegrationService: AmadeusIntegrationService,
      private hotelDataService: HotelDataService,
      private offerDataService: OfferDataService,
  ){ }

  async seed(){
    try {
        Logger.log('Seeding hotel data...')
        
        await this.populate()
        
        Logger.log('Seeding hotel data complete')
    } catch (error) {
        Logger.error('Error seeding hotel data', JSON.stringify(error), HotelSeederService.name)
    }
  }

  async populate(){
    const destinations = await this.destinationDataService.model.find()
    for (const destination of destinations) {
      
      const hotelOffers = await this.amadeusIntegrationService.getHotelOffersByCityCode(destination.IATACode)
      for (const hotelOffer of hotelOffers) {
        
        const hotelDb = await this.saveHotel(destination.id, hotelOffer)
        for (const offer of hotelOffer.offers) {      
          await this.saveOffer(destination.id, hotelDb.id, offer)
        }  
        
      }
    }
  }

  private async saveHotel(destinationId: string, amadeushotelOffer: AmadeusHotelOffer): Promise<Hotel> {

    const averagePrize = amadeushotelOffer?.offers.map(offer => offer?.price?.total ? parseFloat(offer?.price?.total) : 0)
                                                  .reduce((a, b) => a + b, 0)
    const amadeusHotel = amadeushotelOffer.hotel
    const hotel: IHotel = {
      Type: amadeusHotel.type,
      ExternalHotelId: amadeusHotel.hotelId,
      ChainCode: amadeusHotel.chainCode,
      DupeId: amadeusHotel.dupeId,
      Name: amadeusHotel.name,
      Rating: amadeusHotel.rating,
      CityCode: amadeusHotel.cityCode,
      Latitude: amadeusHotel.latitude,
      Longitude: amadeusHotel.longitude,
      HotelDistance: { 
        Distance: amadeusHotel.hotelDistance?.distance,
        DistanceUnit: amadeusHotel.hotelDistance?.distanceUnit
      },
      Address: {
        Lines: amadeusHotel.address?.lines,
        CityName: amadeusHotel.address?.cityName,
        CountryCode: amadeusHotel.address?.countryCode,
        PostalCode: amadeusHotel.address?.postalCode,    
      },
      Contact: {
        Phone: amadeusHotel.contact?.phone,
        Fax: amadeusHotel.contact?.fax,
      },
      Amenities: amadeusHotel.amenities,
      Media: amadeusHotel.media?.map(m => <IMedium>{
        Uri: m.uri,
        Category: m.category,    
      }),
      Description: amadeusHotel.description?.text,
      DestinationId: new ObjectId(destinationId),
      AveragePrize: averagePrize,
    }

    return await this.hotelDataService.model.findOneAndUpdate({ ExternalHotelId: hotel.ExternalHotelId }, hotel, { upsert: true, new: true })
  }
  
  private async saveOffer(destinationId: string, hotelId: string, amadeuOffer: AmadeusOffer): Promise<Offer> {
  
    const offer: IOffer = {
      ExternalId: amadeuOffer.id,
      RateCode: amadeuOffer.rateCode,
      Room: {
        Type:  amadeuOffer.room?.type,
        Description: amadeuOffer.room?.description?.text,
      },
      Guests: {
        Adults: amadeuOffer.guests?.adults 
      },
      Price: {
        Currency: amadeuOffer.price?.currency,
        Base: amadeuOffer.price?.base,
        Total: amadeuOffer.price?.total,
      },
      DestinationId: new ObjectId(destinationId),
      HotelId: new ObjectId(hotelId),
    }

    return await this.offerDataService.model.findOneAndUpdate({ ExternalId: offer.ExternalId }, offer, { upsert: true })
  }
}
