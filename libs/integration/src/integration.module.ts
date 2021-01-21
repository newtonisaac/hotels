import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ValueProvider } from '@nestjs/common/interfaces';
import { INTEGRATION_CONFIG } from './integration.constants';
import { IntegrationOptions, IntegrationAsyncOptions, IntegrationOptionsFactory } from './integration.options';
import { AmadeusIntegrationService } from './amadeus/amadeus-integration.service';
import { AccuweatherIntegrationService } from './accueweather/accuweather-integration.service';

@Module({})
export class IntegrationModule {
  
  public static forRoot(options: IntegrationOptions): DynamicModule {
    const IntegrationOptionsProvider: ValueProvider<IntegrationOptions> = {
      provide: INTEGRATION_CONFIG,
      useValue: options,
    };

    return {
      module: IntegrationModule,
      providers: [
        IntegrationOptionsProvider,
        AmadeusIntegrationService,
        AccuweatherIntegrationService,
      ],
      exports: [
        AmadeusIntegrationService,
        AccuweatherIntegrationService,
      ],
    };
  }

  public static forRootAsync(options: IntegrationAsyncOptions): DynamicModule {
    const providers: Provider[] = this.createAsyncProviders(options);

    return {
      module: IntegrationModule,
      providers: [
        ...providers,
        AmadeusIntegrationService,
        AccuweatherIntegrationService,
      ],
      imports: options.imports,
      exports: [
        AmadeusIntegrationService,
        AccuweatherIntegrationService,
      ],
    };
  }

  private static createAsyncProviders(options: IntegrationAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: IntegrationAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        name: INTEGRATION_CONFIG,
        provide: INTEGRATION_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      name: INTEGRATION_CONFIG,
      provide: INTEGRATION_CONFIG,
      useFactory: async (optionsFactory: IntegrationOptionsFactory) => {
        return optionsFactory.createIntegrationOptions();
      },
      inject: [options.useExisting! || options.useClass!],
    };
  }
}