
## Dependencies
- yarn
- node v12
- docker/docker-compose

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# up mongo
docker-compose up -d

# seed the database, if erros on AccuWeather API, change between  ACCUWEATHER_API_KEY_#(1,2,3,4) on file tui/apps/seeder/src/configuration/index.ts or restore with data of ./backup_data
yarn start seeder

# running microservices
yarn start destination # -> http://localhost:3000/destination/docs
yarn start hotel       # -> http://localhost:3000/hotel/docs
yarn start offer       # -> http://localhost:3000/offer/docs 
yarn start weather     # -> http://localhost:3000/weather/docs
```


## Stay in touch

- Author/Website - [Isaac Newton](https://engisaacnewton.com/)

## License

Nest is [MIT licensed](LICENSE).
