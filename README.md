
## Dependencies
- yarn
- node v12
- docker/docker-compose

## Description

Libs:
- Domain -> Contains and centralize the business logic 
- Integration -> Resposible to implement data getters for external APIs

Apps:
- Seeder -> Job for get and upsert data to mongodb
- Destination -> API of cities/airports from Brazil/Portugal/Italy/Spain
- Hotel -> API to get hotel for destination and/or order by price/ratio 
- Offer -> API to get best offers or/and offer by destination
- Weather -> API to retrieve the current* weather of a destination  

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
