import fastify from 'fastify'
import { fastifyAwilixPlugin } from '@fastify/awilix'
import { estabelecimentosRoutes } from './routes/estabelecimentos.routes'

// eslint-disable-next-line import/first

import { diGetAllEstabelecimentos } from './shared/container'
import { demandaRoutes } from './routes/demanda.routes'
import { z } from 'zod'
import { setorizacaoRoutes } from './routes/setorizacao.routes'
import { env } from './env'
import cors from '@fastify/cors'

export const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
})
console.log(env.NODE_ENV)

app.addHook('onRequest', diGetAllEstabelecimentos)
app.setErrorHandler((error: any, request, reply) => {
  const errParams = z.object({
    statusCode: z.number(),
    message: z.string().default('Erro'),
  })

  const { statusCode, message } = errParams.parse(error)
  reply.status(statusCode).send(message)
})
app.get('/', () => {
  return 'Oi'
})
app.register(estabelecimentosRoutes, { prefix: '/estabelecimentos' })
app.register(demandaRoutes, { prefix: '/demanda' })
app.register(setorizacaoRoutes, { prefix: '/setorizacao' })
