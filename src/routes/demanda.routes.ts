import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { DemandaRepository } from '../modules/demanda/infra/prisma/repository/DemandaRepository'

export async function demandaRoutes(app: FastifyInstance) {
  const repository = new DemandaRepository()
  app.get('/years', async () => {
    const years = await repository.getYears()

    return years
  })
  app.get('/months/:month', async (request: FastifyRequest) => {
    const requestMonthParam = z.object({
      month: z.string(),
    })
    const { month } = requestMonthParam.parse(request.params)
    const months = await repository.getMonths(month)

    return months
  })
  app.get('/distribuidores/:year/:month', async (request: FastifyRequest) => {
    const requestMonthParam = z.object({
      month: z.string(),
      year: z.string(),
    })
    const { year, month } = requestMonthParam.parse(request.params)
    const months = await repository.getDistribuidores(year, month)

    return months
  })
  app.get('/:year/:month/:cnpj', async (request: FastifyRequest) => {
    const requestMonthParam = z.object({
      month: z.string(),
      year: z.string(),
      cnpj: z.string(),
    })
    const { year, month, cnpj } = requestMonthParam.parse(request.params)
    const months = await repository.getDemanda(year, month, cnpj)

    return months
  })
}
