import dotenv from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env.development' })
} else {
  dotenv.config()
}

const envSchema = z.object({
  SOA_HOST: z.string(),
  SOA_LINK: z.string(),
  SOA_EMAIL: z.string(),
  SOA_SENHA: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('🚫 Invalid enviroment variable', _env.error.format())
  throw new Error(`Invalid enviroment variable`)
}

export const env = _env.data
