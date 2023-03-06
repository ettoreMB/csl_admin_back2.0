import fastify from 'fastify'
import { fastifyAwilixPlugin } from '@fastify/awilix'
import { estabelecimentosRoutes } from './routes/estabelecimentos.routes'

// eslint-disable-next-line import/first

import { diGetAllEstabelecimentos, diMunicipios } from './shared/container'
import { demandaRoutes } from './routes/demanda.routes'
import { z } from 'zod'
import { setorizacaoRoutes } from './routes/setorizacao.routes'
import cors from '@fastify/cors'
import { municipiosRoutes } from './routes/municipios.routes'

export const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
})

app.addHook('onRequest', diGetAllEstabelecimentos)
app.addHook('onRequest', diMunicipios)
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
app.register(municipiosRoutes, { prefix: '/municipios' })
