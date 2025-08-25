import { NestFactory } from '@nestjs/core'
import { SeedModule } from './seed.module'
import { RolesSeeder } from './roles.seeder'
import { UsersSeeder } from './users.seeder'
import { CharactersSeeder } from './characters.seeder'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: ['log', 'error', 'warn', 'debug'] // ← Configura el logger
  })

  const roles = app.get(RolesSeeder)
  const users = app.get(UsersSeeder)
  const characters = app.get(CharactersSeeder)

  await roles.drop()
  await users.drop()
  await characters.drop()

  await roles.seed()
  await users.seed()
  await characters.seed()

  await app.close()

  console.log('Seed is done')
}
bootstrap()
