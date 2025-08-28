import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'log']
  })
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    exposedHeaders: ['X-New-Access-Token'] // Para el refresh token
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
