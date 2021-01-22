import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import configuration from './configuration'
import * as bodyParser from 'body-parser'
import { useContainer } from 'class-validator'

async function bootstrap(): Promise<void> {
	const conf = configuration()
	const app = await NestFactory.create(AppModule, conf.main)

	app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, transform: false }))
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	const customSiteTitle = 'TUI Hotel API'
	const options = new DocumentBuilder()
		.setTitle(customSiteTitle)
		.setDescription("A TUI API from Newton")
		.setVersion('1.0')
		.addTag('hotel','')
		.build()

	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('docs', app, document, {
		customSiteTitle: customSiteTitle,
	})

	await app.listen(configuration().port, () => {
		Logger.log('Application listening on port ' + configuration().port)
	})
}
bootstrap()
