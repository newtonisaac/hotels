import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface IntegrationOptions {
    accuweather: {
        api_url?: string;
        api_key?: string;
    },
    amadeus: {
        api_key?: string;
        api_secret?: string;
    }
}

export interface IntegrationAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<IntegrationOptionsFactory>;
  useClass?: Type<IntegrationOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IntegrationOptions> | IntegrationOptions;
}

export interface IntegrationOptionsFactory {
  createIntegrationOptions():
    | Promise<IntegrationOptions>
    | IntegrationOptions;
}