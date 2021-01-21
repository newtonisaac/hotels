import { LogLevel } from '@nestjs/common'

export default () => ({
	env: process.env.NODE_ENV || 'dev',
	main: {
		logger: process.env.LOGGER?.split(',') as LogLevel[],
    },
    amadeus: {
        api_key: process.env.AMADEUS_API_KEY,
        api_secret: process.env.AMADEUS_API_SECRET
    },
    accuweather: {
        api_url: process.env.ACCUWEATHER_API_URL,
        api_key: process.env.ACCUWEATHER_API_KEY_4,
    },
    mongo: { connection: process.env.MONGO_CONNECTION }
})
