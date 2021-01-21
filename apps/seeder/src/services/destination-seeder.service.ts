import { Injectable, Logger } from '@nestjs/common';
import { DestinationDataService } from '@tui/domain/services/data/destination-data.service';
import { AccuweatherIntegrationService } from '@tui/integration/accueweather/accuweather-integration.service';
import { IDestination } from '@tui/domain/interfaces/destination.interface';

@Injectable()
export class DestinationSeederService {
  constructor(
      private destinationDataService: DestinationDataService,
      private accuweatherIntegrationService: AccuweatherIntegrationService,
  ){ }

  async seed(){
    try {
        Logger.log('Seeding destination data...')
        
        await this.populate()
        
        Logger.log('Seeding destination data complete')
    } catch (error) {
        Logger.error('Error seeding destination data', error, DestinationSeederService.name)
    }
  }

  async populate(){
    for (const destination of this.tuiDestinations) {
      await this.destinationDataService.model.findOneAndUpdate({ IATACode: destination.IATACode }, destination, { upsert: true })
    }

    const destinationToUpd = await this.destinationDataService.model.find({ AccuLocationKey: { $exists: false } })
    for (const destination of destinationToUpd) {
      const accuLocation = await this.accuweatherIntegrationService.getLocationByTextAndCountryCode(destination.City, destination.CountryCode).toPromise()
      if (accuLocation?.Key) {
        await this.destinationDataService.model.findOneAndUpdate({ IATACode: destination.IATACode }, { AccuLocationKey: accuLocation.Key }, { upsert: true })
      }
    }
  }

  private tuiDestinations: IDestination[] = [
    { City: 'Faro', CountryCode: 'PT', IATACode: 'FAO' },
    { City: 'Madeira', CountryCode: 'PT', IATACode: 'FNC' },
    { City: 'São Paulo', CountryCode: 'BR', IATACode: 'GRU' },
    { City: 'Rio de Janeiro', CountryCode: 'BR', IATACode: 'SDU' },
    { City: 'Fortaleza', CountryCode: 'BR', IATACode: 'FOR' },
    { City: 'Naples', CountryCode: 'IT', IATACode: 'NAP' },
    { City: 'Turin', CountryCode: 'IT', IATACode: 'TRN' },
    { City: 'Verona', CountryCode: 'IT', IATACode: 'VRN' },
    { City: 'Ibiza', CountryCode: 'ES', IATACode: 'IBZ' },
    { City: 'Málaga', CountryCode: 'ES', IATACode: 'AGP' },
    { City: 'Jerez de la Frontera', CountryCode: 'ES', IATACode: 'XRY' },
  ] 
}
